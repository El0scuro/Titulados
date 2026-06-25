'use client';
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { Box, Dialog, DialogActions, 
        DialogContent, DialogContentText,
        DialogTitle, Button, Typography,
        Input} from '@mui/material'
import estilo from "./style.module.css";
import { useSearchParams } from "next/navigation";
import __url from "../../../lib/const";
import { useEffect, useMemo, useState} from 'react';
import { Estudiante } from "@/types/estudiante";
import { Secretario } from "@/types/secretario";
import { Jefatura } from "@/types/jefatura";

function Page() {
  const searchParams = useSearchParams();
  const mail = searchParams.get("mail");
  const sede = searchParams.get("sede")
  
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [personal, setPersonal] = useState("")
  const [estudiante, setEstudiante] = useState<Estudiante>();
  const [secretarios, setSecretaria] = useState<Secretario[]>([]);
  const [jefaturas, setJefatura] = useState<Jefatura[]>([]);
  //importo los estudiantes, secretari@s y jefatura
    useEffect(() => {
    if(!mail){
      return;
    }
    const datosImport = async () => {
        try {
            const [estuRes, secRes, jefRes] = await Promise.all([
              axios.get(`${__url}/estudiante/${mail}`),
              axios.get(`${__url}/secretaria/todos`),
              axios.get(`${__url}/jefatura/todas`),
            ]);
            setEstudiante(estuRes.data);
            setSecretaria(secRes.data);
            setJefatura(jefRes.data);
        } catch (error) {
            console.log(error);
        }
    };
    datosImport();
  }, []);
  
  const secresSede = useMemo(() => {
      return secretarios.filter(sec => sec.sede === sede);
  }, []);
    
  const jefasSede = useMemo(() => {
    return jefaturas.filter(jef => jef.sede === sede);
  }, []);
  
  const remitentes = useMemo(() => {
    const correos: (Jefatura & Secretario)[] = [];

    for(let i = 0; i < secresSede.length; i++){
    correos.push(secresSede[i]);
    }
    
    for(let i = 0; i < jefasSede.length; i++){
      correos.push(jefasSede[i]);
    }

    return correos;
  }, [secresSede, jefasSede]);

  if(!mail){
    return;
  }
  if(!sede){
    return;
  }
  if(!estudiante){
    return null;
  }
  const visible = !estudiante?.mailPersonal;
  
  const handleClose = () => {
  setOpen(false);
  };
  const handleClose2 = () => {
  setOpen2(false);
  };

  const cargando = () => {
    Swal.fire({
      title: "Cargando . . .",
      text: "Espere por favor",
      html: '<i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };
  const handleFileUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    cargando();

    const formData = new FormData();
    formData.append("mail", mail);
    formData.append("file", file);
    

    if (!mail) {
    Swal.fire("Error", "No se pudo obtener el correo del usuario", "error");
    return;
  }

    const endpoint = `${__url}/ficha/ficha_inscripcion`;


    try {
      await axios.post(endpoint, formData, {
        withCredentials: true,
      });
      Swal.fire(
        "Subida exitosa",
        "Su ficha ha sido subida correctamente",
        "success"
      );
      for(let i = 0; i < remitentes.length; i++){
        await axios.post(`${__url}/mail/enviar`, {
                  toMail: `${remitentes[i].mail}`,
                  subject: `Documento subido`,
                  text: `El estudiante ${estudiante.nombre} ${estudiante.apellido} ${estudiante.segundoApellido}, subió su ficha de inscripción`
        });
      }
    } catch {
      Swal.fire(
        "Error",
        "Hubo un error al subir el archivo, pruebe nuevamente más tarde.",
        "error"
      );
    }
  };
  const handleFileDownload = async () => {
    try {
      const response = await axios.get(
        `${__url}/ficha/molde/fichas_inscripcion/molde.docx`,
        { responseType: "blob" }
      );
    
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
    
      // Intentar obtener nombre del header (si el backend lo envía)
      let fileName = "archivo";
    
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) {
          fileName = match[1];
        }
      } else {
        // Si no viene nombre, inferir extensión por MIME
        const mime = blob.type;
    
        if (mime === "application/pdf") {
          fileName = "Formulario_Inscripcion.pdf";
        } else if (
          mime ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileName = "Formulario_Inscripcion.docx";
        } else {
          fileName = "archivo.bin"; // fallback
        }
      }
    
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
    
      document.body.appendChild(a);
      a.click();
    
      a.remove();
      window.URL.revokeObjectURL(url);
    
    } catch {
    Swal.fire(
      "Error",
      "Hubo un error al descargar el archivo",
      "error"
    );
  }
};

  const enviarPersonal = async() => {
    if (!personal || personal.trim() === "") {
    Swal.fire("Error", "Por favor, llene el campo", "error")
    return;
}
    try{
      await axios.patch(`${__url}/estudiante/actualizar/${estudiante.mail}`,{
        mail: estudiante.mail,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        rut: estudiante.rut,
        mailPersonal: personal
      })
      
    Swal.fire("Completado", "Su correo se ha guardado correctamente, muchas gracias", "success");
      
    }catch{

    }
  };
  return (
      <>
        
        
        <Button
          href="/auth/logout"
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
        Salir
        </Button>
        <Box sx={{
          display:"flex", 
          flexDirection:"column", 
          justifyContent:"center", 
          alignItems:"center", 
          gap:"100px"}} 
          className={estilo.contenedor_page}
        >
          <Box sx={{
            width:{md: "550px", xs: '275px'}, 
            height:{md:"250px", xs: '200px'}, 
            backgroundColor:"lightgray", 
            display:"flex", 
            flexDirection:"column", 
            justifyContent:"center", 
            alignItems:"center",
            gap:"10px",
            borderRadius:"3%"}}
          >
            <Box sx={{ 
              padding: 2, 
              display: "flex", 
              position:"relative",
              bottom:"10px",
              textAlign: 'center',
              alignItems:"flex-start", 
              justifyContent:"center"}}>
              <Typography sx={{
                fontSize: {xs: '18px', md: '30px'},
                textAlign: 'center'
              }} >Bienvenido al Sistema de Titulación</Typography>
            </Box>
            <Box sx={{ 
              padding: 2, 
              height:{md: "70px", xs: "35px" },
              width:{md: "500px", xs: "250px"} ,
              display:"flex",
              textAlign:"center",
              position:"relative",
              bottom:"50px"}} >
              <Typography sx={{ fontSize: {xs:'12px', md:'17px'}}}>
                  Por favor, complete la ficha de inscripción para estudiantes. Asegúrese 
                  de proporcionar toda la información requerida de manera precisa y completa. 
              </Typography>
            </Box>
            <Box sx={{
              display:"flex", 
              justifyContent:"center", 
              alignItems:"center",
              position:"relative",
              bottom:{md: "30px", xs: "15px"},
              gap:"15px",
              textAlign:"center"}}>
              <Button
                onClick={handleFileDownload}
                variant="contained"
                sx={{
                  backgroundColor: "rgba(0, 150, 136, 1)",
                  height:{md:"50px", xs: '25px'},
                  width:{md:"180px", xs: '90px'},
                  fontSize: {xs: '6px', md:'14px'},
                  transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                  "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                  
                  }
                }}      
              >
                Descargar Ficha de Inscripción
              </Button>
              <input
                className={estilo.input}
                accept="*"
                id="upload-ficha"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              ></input>
              <label
                htmlFor="upload-ficha"
              >
              <Button
                variant="contained"
                component="span"
                sx={{ 
                  backgroundColor: "rgba(0, 60, 88, 1)",
                  height:{md:"50px", xs: '25px'},
                  width:{md:"180px", xs: '90px'},
                  fontSize: {xs: '6px', md:'14px'},
                  transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                  "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                  
                }
                }}
              >
                Subir Ficha de Inscripción
              </Button>
                </label>
            </Box>
          </Box>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Notificación</DialogTitle>
              <DialogContent>
                  <DialogContentText>¡Archivo subido con éxito!</DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cerrar</Button>
              </DialogActions>
          </Dialog>
          <Dialog open={open2} onClose={handleClose2}>
              <DialogTitle>Notificación</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Hubo un error al subir el archivo, pruebe nuevamente más tarde
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose2}>Cerrar</Button>
              </DialogActions>
          </Dialog>
          {visible && (
            <Box
            sx={{
              background:'white',
              height:{md: '110px', xs: '80px'},
              width:{md:'220px', xs: '130px'},
              position:'absolute',
              top:'15px',
              left:'15px',
              border:1,
              borderRadius:'10px',
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
            }}
            >
              <Typography sx={{fontSize:{md:'14px', xs:'8px'}}}> 
                Ingrese su correo personal, (NO UV)
              </Typography>
              <Input
              value={personal}
              onChange={(e) => setPersonal(e.target.value)}
              placeholder="Correo personal"
              sx={{
                fontSIze: {xs: '8px'}
              }}
              />
              <Button 
              onClick={enviarPersonal}
              >
                enviar
              </Button>
              
            </Box>
          )}
        </Box>
      </>
  )


}
export default Page
