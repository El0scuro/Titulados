"use client"; // Required for client-side components in Next.js App Router
import CloudDownloadDualColor from '@/app/components/downloadIcon';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Card, Typography, Modal, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, TextField } from '@mui/material'; // Added Select, MenuItem, FormControl, InputLabel
import React, { useEffect, useMemo, useState } from 'react';
import SingleFileUploadButton from '@/app/components/singleFileButton'; // Ensure this path is correct
import SendIcon from '@mui/icons-material/Send';
import { DataGrid} from '@mui/x-data-grid';
import type { GridColDef} from '@mui/x-data-grid';
import axios from 'axios';
import __url from '@/lib/const';
import Swal from 'sweetalert2';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as XLSX from 'xlsx';
import { useSearchParams } from 'next/navigation';
import { Estudiante } from '@/types/estudiante';
import { Profesor } from '@/types/profesor';
import { Asignacion } from '@/types/asignacion';
import { Notas } from '@/types/notas';
import { Tesis } from '@/types/tesis';
import MoodBadTwoToneIcon from '@mui/icons-material/ClearOutlined';
import MoodTwoToneIcon from '@mui/icons-material/Done';
import { Ficha } from '@/types/fichas_inscripcion';

 // --- DataGrid Columns and Rows for Manual File Upload Section ---
 interface StudentRow {
    nombre: string;
    segundoNombre: string;
    apellido: string;
    segundoApellido: string;
    mail: string;
    rut: string;
    sede: string;
}

function Archivos() {

    const [showPageEliminar, setShowPageEliminar] = useState(false);
    const [eliminadoSeleccionado, setEliminadoSeleccionado] = useState<filas>();
    
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
    const [notas, setNotas] = useState<Notas[]>([]);
    const [tesis, setTesis] = useState<Tesis[]>([]);
    const [fichas, setFichas] = useState<Ficha[]>([]);

    const searchParams = useSearchParams();
    const sede = searchParams.get("sede") ?? "";
    const [finished, setFinished] = useState(true);
    
    const [actualizar, setActualizar] = useState(false);
    
    const [filaSeleccionada, setFilaSeleccionada] = useState<StudentRow>();    
    //Aquí se guardará la plantilla excel
    const [archivoExcel, setArchivoExcel] = useState<File | null>(null);

    const [selectedStudentIdForUpload, setSelectedStudentIdForUpload] = useState<string | null>(null);

    const [openUploadModal, setOpenUploadModal] = useState(false); // Renamed 'open' to 'openModal' for clarity

    const [openDownloadModal, setOpenDownloadModal] = useState(false);

    const [selectedFileType, setSelectedFileType] = useState<string>(''); // State for selected file type in modal

    const [individualFileToUpload, setIndividualFileToUpload] = useState<File | null>(null); // State for the file chosen in the modal

    const [fileInputKey] = useState(0); // <-- Add this state

    useEffect(() => {
        if(!finished){
            return;
        }
        const datos_todos = async() => {
            const [estRes, proRes, asiRes, notRes, tesRes, ficRes] = await Promise.all([
                axios.get(`${__url}/estudiante/todos`),
                axios.get(`${__url}/profesor/todos`),
                axios.get(`${__url}/asignaciones/todas`),
                axios.get(`${__url}/notas/todas`),
                axios.get(`${__url}/tesis/todas`),
                axios.get(`${__url}/ficha/todas`)
            ]);
            setEstudiantes(estRes.data);
            setProfesores(proRes.data);
            setAsignaciones(asiRes.data);
            setNotas(notRes.data);
            setTesis(tesRes.data);
            setFichas(ficRes.data);
            setFinished(false);
        }
        datos_todos();
    }, [finished]);

    //selecciona el archivo excel y lo guarda en ArchivoExcel
    const handleExcelFileSelect = (file: File | null) => { // Renamed for clarity
        setArchivoExcel(file);
    
    };

    const handleFileDownload = async () => {
  try {
    const response = await axios.get(
      `${__url}/secretaria/archivos_secretaria/plantilla.xlsx`,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ficha_de_estudiantes.xlsx";

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url); // buena práctica

    Swal.fire("Descargado", "Archivo descargado correctamente", "success");
  } catch (error) {
    console.log(error);
    Swal.fire(
      "Error",
      "Hubo un error al descargar el archivo",
      "error"
    );
  }
};

    const handleExcel = (file: File) => {
        const reader = new FileReader();  
        //se ejecuta cuando se termine de leer el archivo
        reader.onload = async(e) => {
            const data = e.target?.result;
            if (!data) return;

            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const json = XLSX.utils.sheet_to_json(worksheet);
            await axios.post(`${__url}/estudiante/varios`, json, {
                withCredentials: true
            })
            
        };
        //Lee el archivo
        reader.readAsArrayBuffer(file);
    };
    //Abrir y  cerrar ventana para subir archivos individuales
    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => {
        setOpenUploadModal(false);
        setSelectedFileType(''); // Reset selected file type on close
        setIndividualFileToUpload(null); // Reset file on close
        setSelectedStudentIdForUpload(null); // Reset student ID on close
    };

    //Abrir y cerrar ventana para bajar archivos individuales

    const handleOpenDownloadModal = () => setOpenDownloadModal(true);
    const handleCloseDownloadModal = () => {
        setOpenDownloadModal(false);
        setSelectedFileType(''); // Reset selected file type on close
        setIndividualFileToUpload(null); // Reset file on close
        setSelectedStudentIdForUpload(null); // Reset student ID on close
    };

    const ficha_subida = (nombreEstudiante: string) => {
        const mailestudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === nombreEstudiante)?.mail;
        
        if(!mailestudiante){
            return;
        }
        const ficha = fichas.find(fic => fic.mailEstudiante === mailestudiante)?.nombreArchivo;
        if(ficha){
            return <MoodTwoToneIcon sx={{color:'green'}} />
        }
        else{
            return <MoodBadTwoToneIcon sx={{color:'red'}}/>
        }
    }

    const columns: GridColDef<StudentRow>[] = [
        { field: 'nombre', headerName: 'Nombre', width: 130, editable: true },
        { field: 'segundoNombre', headerName: 'Segundo Nombre', width: 130, editable: true },
        { field: 'apellido', headerName: 'Apellido Paterno', width: 130, editable: true },
        { field: 'segundoApellido', headerName: 'Apellido Materno', width: 130, editable: true },
        { field: 'mail', headerName: 'Correo', width: 200, editable: true },
        { field: 'rut', headerName: 'RUT', width: 120, editable: true },
        { field: 'sede', headerName: 'Sede', width: 120},
        { field: 'ficha', headerName: 'Ficha Académica', width: 120, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {ficha_subida((params.row.nombre + " " + params.row.segundoNombre + " " + params.row.apellido + " " + params.row.segundoApellido))}
                </Box>
            )}
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 120,
            renderCell: (params) => (
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    height:'100%',
                }}
                >
                    <Button
                    sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'20px',
                        fontSize: '14px'
                    }}
                    onClick={() => handleClickUpload(params.row.mail)}
                    
                    >
                        Subir Documento
                    </Button>
                    <Button
                    sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'20px',
                        fontSize: '14px'
                    }}
                    onClick={() => handleClickDownload(params.row.mail)}
                    >
                        Bajar Documento
                    </Button>
                    <Button
                    sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        height:'20px',
                        fontSize: '14px'
                    }}
                    onClick={() => {
                        setActualizar(true);
                        setFilaSeleccionada(params.row);
                    }}
                    >
                        Actualizar datos
                    </Button>
                    <Button
                    sx={{color:'red'}}
                    onClick={() => {
                        setShowPageEliminar(true);
                        setEliminadoSeleccionado({
                            studentName: params.row.nombre + " " + params.row.apellido,
                            mail: params.row.mail
                        });
                    }}
                    >
                        ELIMINAR ESTUDIANTE
                    </Button>
                </Box>
                
            )
        },
    ];

    const filas = useMemo(() => {
        if(!estudiantes.length) return [];
        const Filas = estudiantes.filter(est => est.sede === sede).map(est => {
            return {
                nombre: est.nombre,
                segundoNombre: est.segundoNombre,
                apellido: est.apellido,
                segundoApellido: est.segundoApellido,
                mail: est.mail,
                rut: est.rut,
                sede: est.sede
            }
        });
        return Filas
    }, [estudiantes])

    // Handler for the "Subir Documento" button click within DataGrid
    const handleClickUpload = (mail: string) => {
        setSelectedStudentIdForUpload(mail);
        handleOpenUploadModal(); // Open the modal
    };
    // Handler for the "Bajar Documento" button click within DataGrid
    const handleClickDownload = (mail: string) => {
        setSelectedStudentIdForUpload(mail);
        handleOpenDownloadModal(); // Open the modal
    };

    const handleFileTypeChange = (event: SelectChangeEvent) => {
  setSelectedFileType(event.target.value);
};

    const handleIndividualFileSelect = (file: File | null) => {
        setIndividualFileToUpload(file);
    };

    const handleUploadIndividualFile = async () => {
        if (selectedStudentIdForUpload && selectedFileType && individualFileToUpload) {
            const formData = new FormData();
            formData.append('mail', selectedStudentIdForUpload);
            formData.append('file', individualFileToUpload);
            try {
                switch (selectedFileType){
                case "ficha":
                    axios.post(`${__url}/${selectedFileType}/ficha_inscripcion`, formData, {
                        withCredentials: true,
                    });
                    break;
                case "tesis":
                    axios.post(`${__url}/${selectedFileType}/Tesis`, formData, {
                        withCredentials: true,
                    });
                    break;
                case "guia":
                    axios.post(`${__url}/${selectedFileType}/rubrica_guia`, formData, {
                        withCredentials: true,
                    });
                    break;
                case "informante":
                    axios.post(`${__url}/${selectedFileType}/rubrica_informante`, formData, {
                        withCredentials: true,
                    });
                    break;
                default:
                    break;
            }
                
                Swal.fire({
                    icon: 'success',
                    title: `Archivo subido correctamente: ${individualFileToUpload.name}`
                })

            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al subir el archivo',
                    text: `No se pudo subir el archivo: ${individualFileToUpload.name}`,
                });
            }
                        
            handleCloseUploadModal();

        } else {
            console.warn('Faltan datos para subir el archivo individual (estudiante, tipo de archivo o archivo).');
            alert('Por favor, selecciona el tipo de archivo y el archivo a subir.');
        }
    };

    
    interface datos {
        numero: number;
        semestre: string;
        alumno: string; 
        rut: string;
        codCarrera: string;
        ingreso: number;
        egreso: number;
        fechaExamen: string;
        horaExamen: string;
        mailEstudiante: string;
        celular: string;
        guia: string;
        informante: string;
        presidente: string;
        secretario: string;
        tesis: string;
        notaGuia: number;
        notaInformante: number;
        notaTesis: number;
        notaDefensa: number;
        notaFinal: number;
    }
    const handleReporteFileDownload = async() => {
        try{
            //datos que se suirán al reporte
            const datos: datos[] = [];

            let mailGuia: string;
            let guia;
            let mailInformante: string;
            let informante;
            let mailPresidente: string;
            let presidente;
            let mailSecretario: string;
            let secretario;
            
            let notasEstudiante: Notas | undefined;
            let notaGuia;
            let notaInformante;
            let notaTesis;
            let notaDefensa;
            let notaFinal;

            let tesisEstudiante;

            let fechaExamen;
            let horaExamen;
            for(let i = 0; i < estudiantes.length; i++){
                //asignaciones del estudiante filtrada por los roles
                mailGuia = asignaciones.filter(asig => asig.mailEstudiante === estudiantes[i].mail).find(asig => asig.rol === 'guia')?.mailProfesor ?? '---';
                guia = profesores.find(pro => pro.mail === mailGuia)?.nombre + " " + profesores.find(pro => pro.mail === mailGuia)?.apellido + " " + profesores.find(pro => pro.mail === mailGuia)?.segundoApellido;
                
                mailInformante = asignaciones.filter(asig => asig.mailEstudiante === estudiantes[i].mail).find(asig => asig.rol === 'informante')?.mailProfesor ?? '---';
                informante = profesores.find(pro => pro.mail === mailInformante)?.nombre + " " + profesores.find(pro => pro.mail === mailInformante)?.apellido + " " + profesores.find(pro => pro.mail === mailInformante)?.segundoApellido;
                
                mailPresidente = asignaciones.filter(asig => asig.mailEstudiante === estudiantes[i].mail).find(asig => asig.rol === 'presidente')?.mailProfesor ?? '---';
                presidente = profesores.find(pro => pro.mail === mailPresidente)?.nombre + " " + profesores.find(pro => pro.mail === mailPresidente)?.apellido + " " + profesores.find(pro => pro.mail === mailPresidente)?.segundoApellido;
                
                mailSecretario = asignaciones.filter(asig => asig.mailEstudiante === estudiantes[i].mail).find(asig => asig.rol === 'secretario')?.mailProfesor ?? '---';
                secretario = profesores.find(pro => pro.mail === mailSecretario)?.nombre + " " + profesores.find(pro => pro.mail === mailSecretario)?.apellido + " "  + profesores.find(pro => pro.mail === mailSecretario)?.segundoApellido;
                
                //notas del estudiante
                notasEstudiante = notas.find(not => not.mailEstudiante === estudiantes[i].mail);
                notaGuia = notasEstudiante?.notaGuia;
                notaInformante = notasEstudiante?.notaInformante;
                notaTesis = notasEstudiante?.notaTesis;
                notaDefensa = notasEstudiante?.notaExamenOral;
                notaFinal = notasEstudiante?.notaFinal;
                if(mailGuia === undefined){
                    guia = 'Ninguno';
                }
                if(mailInformante === undefined){
                    informante = 'Ninguno';
                }
                if(mailPresidente === undefined){
                    presidente = 'Ninguno';
                }
                if(mailSecretario === undefined){
                    secretario = 'Ninguno';
                }
                
                if(!tesisEstudiante){
                    tesisEstudiante = 'No se ha subido'
                }

                if(!notaGuia){
                    notaGuia = 1
                }
                if(!notaInformante){
                    notaInformante = 1
                }
                if(!notaTesis){
                    notaTesis = 1
                }
                if(!notaDefensa){
                    notaDefensa = 1
                }
                if(!notaFinal){
                    notaFinal = 1
                }
                fechaExamen = estudiantes[i].fechaExamen;
                horaExamen = estudiantes[i].hora;
                if(!fechaExamen){
                    fechaExamen = 'No establecida aún'
                }
                if(!horaExamen){
                    horaExamen = 'No establecida aún'
                }
                const numero = i + 1;
                const alumno = estudiantes[i].nombre + " " + estudiantes[i].segundoNombre + " " + estudiantes[i].apellido + " " + estudiantes[i].segundoApellido;
                tesisEstudiante = tesis.find(tes => tes.mailEstudiante === estudiantes[i].mail)?.nombreArchivo;
                if(!tesisEstudiante){
                    tesisEstudiante = 'No se ha subido'
                }
                
                datos.push({
                    numero,
                    semestre: estudiantes[i].semestre,
                    alumno,
                    rut: estudiantes[i].rut,
                    codCarrera: estudiantes[i].codigo,
                    ingreso: estudiantes[i].agnoIngreso,
                    egreso: estudiantes[i].agnoEgreso,
                    fechaExamen,
                    horaExamen,
                    mailEstudiante: estudiantes[i].mail,
                    celular: estudiantes[i].celular,
                    guia,
                    informante,
                    presidente,
                    secretario,
                    tesis: tesisEstudiante,
                    notaGuia,
                    notaInformante,
                    notaTesis,
                    notaDefensa,
                    notaFinal
                })
            }
            const response = await axios.post(`${__url}/excel/reporte`, datos, {
                responseType: 'blob'
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = `Reporte_Estudiantes.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error);
        }
    }

    const handleStudentFileDownload = async () => {
    try {
        if (selectedStudentIdForUpload && selectedFileType) {
            const partMail = selectedStudentIdForUpload.replace(/[^a-zA-Z0-9]/g, '_');
            
                let response;
                let blob;
                let url;
                let a;
                let extension;
                switch (selectedFileType){
                case 'fichas_inscripcion':
                    
                response = await axios.get(
                    `${__url}/ficha/estudiante/${selectedStudentIdForUpload}`, 
                    { responseType: "blob" }
                );
                
                blob = new Blob([response.data], { type: response.data.type });
                url = window.URL.createObjectURL(blob);
                
                // Detectar extensión según MIME
                extension = "bin";
                if (blob.type === "application/pdf") {
                    extension = "pdf";
                } else if (
                    blob.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ) {
                    extension = "docx";
                }
                
                // Intentar obtener nombre desde headers
                let fileName = partMail + "-Formulario_Inscripcion_Seminario_de_Titulo." + extension;
                
                const contentDisposition = response.headers["content-disposition"];
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?(.+)"?/);
                    if (match && match[1]) {
                        fileName = match[1];
                    }
                }
                
                a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                
                document.body.appendChild(a);
                a.click();
                
                a.remove();
                window.URL.revokeObjectURL(url);
                break;
                    
                    
                    case "archivos_Tesis":
                        response = await axios.get(
                            `${__url}/tesis/${selectedStudentIdForUpload}`, 
                            { responseType: "blob" }
                        );
                    
                        blob = new Blob([response.data], { type: response.data.type });
                        url = window.URL.createObjectURL(blob);
                    
                        // Detectar extensión según tipo MIME
                        extension = "";
                        if (blob.type === "application/pdf") {
                            extension = "pdf";
                        } else if (
                            blob.type ===
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ) {
                            extension = "docx";
                        } else {
                            extension = "bin"; // fallback genérico
                        }
                    
                        a = document.createElement("a");
                        a.href = url;
                        a.download = `${partMail}-Tesis.${extension}`; // nombre dinámico según tipo
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    
                        window.URL.revokeObjectURL(url); // buena práctica
                        break;
                case "archivos_guia":
                    response = await axios.get(`${__url}/guia/${selectedFileType}/${partMail}-documento_guia.docx`, 
                        { responseType: "blob" }
                    );
                    blob = new Blob([response.data]);
                    url = window.URL.createObjectURL(blob);

                    a = document.createElement("a");
                    a.href = url;
                    a.download = partMail + "-documento_guia.docx";

                    document.body.appendChild(a);
                    a.click();

                    a.remove();
                    window.URL.revokeObjectURL(url); // buena práctica
                    break;
                case "archivos_Informante":
                    response = await axios.get(`${__url}/informante/${selectedFileType}/${partMail}-documento_informante.xlsx`, 
                        { responseType: "blob" }
                    );
                    blob = new Blob([response.data]);
                    url = window.URL.createObjectURL(blob);

                    a = document.createElement("a");
                    a.href = url;
                    a.download = partMail + "-documento_informante.xlsx";

                    document.body.appendChild(a);
                    a.click();

                    a.remove();
                    window.URL.revokeObjectURL(url); // buena práctica
                    break;
                default:
                    break;
            }
                
                Swal.fire({
                    icon: 'success',
                    title: `Archivo bajado correctamente`
                })

            
                        
            handleCloseDownloadModal();
        } else {
            console.warn('Faltan datos para subir el archivo individual (estudiante, tipo de archivo o archivo).');
            alert('Por favor, selecciona el tipo de archivo y el archivo a subir.');
        }
        Swal.fire("Descargado", "Archivo descargado correctamente", "success");
    } catch{
        Swal.fire(
        "Error",
        "Hubo un error al descargar el archivo",
        "error"
        );
        handleCloseDownloadModal();
    }
    };

    const callActualizado = async(tipoCall: string) => {
        if(!tipoCall){
            return;
        }
        if(tipoCall === 'estudiante'){
            const actualizado = await axios.get(`${__url}/estudiante/todos`);
            setEstudiantes(actualizado.data)
        }
        
    }
    return (
        <Box sx={{ p: 3, width: '100%' }}>

            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Carga de estudiantes vía archivo Excel
                </Typography>
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudDownloadDualColor />}
                    onClick={handleFileDownload}
                    sx={{
                        color:'#003c58',
                        backgroundColor:'white',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    Descargar plantilla para estudiantes
                </Button>
                <SingleFileUploadButton
                    key={fileInputKey}
                    onFileSelect={handleExcelFileSelect}
                    buttonText="Subir archivo de estudiantes en excel (.xlsx, .xls)"
                    acceptedFileTypes=".xlsx, .xls"
                />

                {archivoExcel && (
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            Archivo listo para enviar: <strong>{archivoExcel.name}</strong>
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SendIcon />}
                            onClick={() => handleExcel(archivoExcel)}
                            sx={{
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            Subir Archivo
                        </Button>
                    </Box>
                )}
            </Card>

            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Generar reporte
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
                    En esta sección se podrá generar un reporte de los estudiantes que se encuentran en el Sistema de Seminario de Título UV.
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<SendIcon />}
                    onClick={handleReporteFileDownload}
                    sx={{
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    Descargar reporte de estudiantes
                </Button>
                
            </Card>

            <Card sx={{ mb: 2, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                    Gestión de Documentos Individuales
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
                    Aquí puedes subir archivos específicos para cada estudiante.
                </Typography>
                {/* DataGrid for manual student data entry/view with actions */}
                {showPageEliminar && (
                    <DeletePage
                    action={() => setShowPageEliminar(false)}
                    fila={eliminadoSeleccionado}
                    estudiantes={estudiantes}
                    ActionAction={() => callActualizado('estudiante')}
                    />
                )}
                <Box sx={{ height: '100%', width: '100%' }}>
                <Button onClick={() => setFinished(true)} startIcon={<RefreshIcon />}>
                        Recargar Estudiantes
                    </Button>
                    <DataGrid
                        rows={filas}
                        columns={columns}
                        pageSizeOptions={[10, 20, 30]}
                        rowHeight={90}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 }
                            }
                        }}
                        checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        getRowId={(row: StudentRow) => row.rut}
                        showToolbar={true}
                    />

                </Box>
            </Card>
            {actualizar && (
            <ActualizarPage
            fila={filaSeleccionada}
            onClose={() => setActualizar(false)}
            estudiantes={estudiantes}
            />
            )}
            {/* Modal for individual file upload */}
            <Modal
                aria-labelledby="upload-modal-title"
                aria-describedby="upload-modal-description"
                open={openUploadModal} // Use openModal state
                onClose={handleCloseUploadModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography id="upload-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Subir Documento para el Estudiante : {selectedStudentIdForUpload}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="file-type-select-label">Tipo de Documento</InputLabel>
                        <Select
                            labelId="file-type-select-label"
                            id="file-type-select"
                            value={selectedFileType}
                            label="Tipo de Documento"
                            onChange={handleFileTypeChange}
                        >
                            <MenuItem value=""><em>Selecciona un tipo</em></MenuItem>
                            <MenuItem value="ficha">Ficha de Ingreso</MenuItem>
                            <MenuItem value="tesis">Tesis</MenuItem>
                            <MenuItem value="guia">Rubrica Guía</MenuItem>
                            <MenuItem value="informante">Rubrica Informante</MenuItem>
                        </Select>
                    </FormControl>

                    <SingleFileUploadButton
                        key={fileInputKey}
                        onFileSelect={handleIndividualFileSelect}
                        buttonText={individualFileToUpload ? `Cambiar Archivo: ${individualFileToUpload.name}` : "Seleccionar Archivo"}
                        acceptedFileTypes=".pdf, .doc, .docx, .xlsx, .xls"
                    />

                    {individualFileToUpload && (
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                            Archivo seleccionado: <strong>{individualFileToUpload.name}</strong>
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseUploadModal} sx={{ flexGrow: 1 }}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleUploadIndividualFile}
                            disabled={!selectedFileType || !individualFileToUpload} // Disable if type or file not selected
                            sx={{ flexGrow: 1 }}
                        >
                            Subir
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal for individual file download */}
            <Modal
                aria-labelledby="upload-modal-title"
                aria-describedby="upload-modal-description"
                open={openDownloadModal} // Use openModal state
                onClose={handleCloseDownloadModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography id="upload-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Bajar Documento de él Estudiante : {selectedStudentIdForUpload}
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="file-type-select-label">Tipo de Documento</InputLabel>
                        <Select
                            labelId="file-type-select-label"
                            id="file-type-select"
                            value={selectedFileType}
                            label="Tipo de Documento"
                            onChange={handleFileTypeChange}
                        >
                            <MenuItem value=""><em>Selecciona un tipo</em></MenuItem>
                            <MenuItem value="fichas_inscripcion">Ficha de Ingreso</MenuItem>
                            <MenuItem value="archivos_Tesis">Tesis</MenuItem>
                            <MenuItem value="archivos_guia">Rubrica Guía</MenuItem>
                            <MenuItem value="archivos_Informante">Rubrica Informante</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
                        <Button variant="outlined" onClick={handleCloseDownloadModal} sx={{ flexGrow: 1 }}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleStudentFileDownload}
                            disabled={!selectedFileType} // Disable if type not selected
                            sx={{ flexGrow: 1 }}
                        >
                            Bajar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default Archivos;
interface estudiante {
    nombre: string;
    segundoNombre: string;
    apellido: string;
    segundoApellido: string;
    mail: string;
    rut: string;
    codigo: string;
    agnoIngreso: string;
    agnoEgreso: string;
    nroResolucion: string;
    sede: string;
    semestre: string;
    celular: string;
}
type pageProps = {
    fila : StudentRow | undefined;
    onClose: () => void;
    estudiantes: Estudiante[]; 
}
export function ActualizarPage({fila, onClose, estudiantes}: pageProps) {
    const [estudiante, setEstudiante] = useState<estudiante>();
    if (!fila) return;
    const original = estudiantes.find(est => est.mail === fila.mail);
    const actualizar = async () => {
    const data = {
        nombre: estudiante?.nombre || original?.nombre,
        segundoNombre: estudiante?.segundoNombre || original?.segundoNombre,
        apellido: estudiante?.apellido || original?.apellido,
        segundoApellido: estudiante?.segundoApellido || original?.segundoApellido,
        mail: estudiante?.mail || original?.mail,
        rut: estudiante?.rut || original?.rut,
        sede: estudiante?.sede || original?.sede,
        codigo: estudiante?.codigo || original?.codigo,
        agnoIngreso: Number(estudiante?.agnoIngreso || original?.agnoIngreso),
        agnoEgreso: Number(estudiante?.agnoEgreso || original?.agnoEgreso),
        semestre: estudiante?.semestre || original?.semestre,
        celular: estudiante?.celular || original?.celular,
        nroResolucion: estudiante?.nroResolucion || original?.nroResolucion
    };

    await axios.patch(`${__url}/estudiante/actualizar/${fila.mail}`, data);
};
    return(
        <Box sx={{
              display:'flex',
              flexDirection:'column',
              gap: 2,              
              backgroundColor:'white', 
              position:'absolute', 
              zIndex: 1000, 
              top:"100px",
              left:"400px",
              height:"450px",
              width:"800px",
              borderColor:'black',
              border:1,
              borderRadius:'20px'
            }}>
            <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
                Ingrese los datos que quiere actualizar
            </Typography>
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:4
            }}
            >
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    gap: 2
                }}
                >
                <TextField
                    sx={{ width:'130px' }}
                    label="Nombre"
                    placeholder={original?.nombre}
                    value={estudiante?.nombre || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        nombre: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Segundo nombre"
                    placeholder={original?.segundoNombre}
                    value={estudiante?.segundoNombre || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        segundoNombre: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Apellido"
                    placeholder={original?.apellido}
                    value={estudiante?.apellido || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        apellido: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Segundo apellido"
                    placeholder={original?.segundoApellido}
                    value={estudiante?.segundoApellido || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        segundoApellido: e.target.value
                    })
                    }
                />
                </Box>
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    gap: 2
                }}
                >
                {original?.mail}

                <TextField
                    sx={{ width:'130px' }}
                    label="RUT"
                    placeholder={original?.rut}
                    value={estudiante?.rut || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        rut: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Sede"
                    placeholder={original?.sede}
                    value={estudiante?.sede || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        sede: e.target.value
                    })
                    }
                />
                </Box>
                <Box
                sx={{
                    display:'flex',
                    flexWrap:'wrap',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    gap: 2
                }}
                >
                <TextField
                    sx={{ width:'130px' }}
                    label="Código"
                    placeholder={original?.codigo}
                    value={estudiante?.codigo || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        codigo: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Año ingreso"
                    placeholder={String(original?.agnoIngreso)}
                    value={estudiante?.agnoIngreso || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        agnoIngreso: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Año egreso"
                    placeholder={String(original?.agnoEgreso)}
                    value={estudiante?.agnoEgreso || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        agnoEgreso: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="N° resolución"
                    placeholder={original?.nroResolucion}
                    value={estudiante?.nroResolucion || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        nroResolucion: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Semestre"
                    placeholder={original?.semestre}
                    value={estudiante?.semestre || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        semestre: e.target.value
                    })
                    }
                />

                <TextField
                    sx={{ width:'130px' }}
                    label="Celular"
                    placeholder={original?.celular}
                    value={estudiante?.celular || ""}
                    size="small"
                    onChange={(e) =>
                    setEstudiante({
                        ...estudiante!,
                        celular: e.target.value
                    })
                    }
                />
                </Box>
            </Box>
            <Box
            sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <Button
                onClick={() => {
                actualizar();
            }}
                >
                    Guardar
                </Button>
                <Button
                onClick={onClose}
                >
                    Cerrar
                </Button>
            </Box>
            
        </Box>
    )
} 

export interface filas{
    studentName: string;
    mail: string;
}

type PageProps = {
    fila: filas | undefined;
    estudiantes: Estudiante[];
    action: () => void;
    ActionAction: () => void;
}

export function DeletePage({action: onClose, fila, estudiantes, ActionAction: ActionAction}: PageProps){
    if(!fila){
        return;
    }
    const nombre = fila.studentName.split(" ")[0] + " " + fila.studentName.split(" ")[1];
    const estudiante = estudiantes.find(est => (est.nombre + " " + est.apellido) === nombre);
    
    const borrarEstudiante = async() => {
        try{
            await axios.delete(`${__url}/estados/borrar/${estudiante?.mail}`);
            await axios.delete(`${__url}/asignaciones/borrar_todas/${estudiante?.mail}`)
            .catch(error => {
                console.error("Error al eliminar", error);
            });
            await axios.delete(`${__url}/notas/borrar/${estudiante?.mail}`);
            await axios.delete(`${__url}/estudiante/borrar/${estudiante?.mail}`);

            ActionAction();
        } catch {
        }
        
        
    }
    return(
        <Box
        sx={{
            backgroundColor:'white', 
            position:'absolute', 
            zIndex: 1001, 
            top:"70px",
            left:"1000px",
            height:"250px",
            width:"450px",
            borderRadius:'10px',
            borderColor:'black',
            border:1,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:4
          }}
        >
            <Typography>
                ¿Está seguro de querer eliminar a 
            </Typography>
            <Typography>
                {nombre}
            </Typography>
            <Typography>
                del Sistema de 
                Seminario de Titulo de forma permanente?
            </Typography>
            <Box
            sx={{
                display:'flex',
                flexDIrection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:2
            }}
            >
                <Button
                sx={{color:'red'}}
                onClick={() => {
                    borrarEstudiante();
                    onClose();
                }}
                >
                    Si, borrar
                </Button>
                <Button
                onClick={onClose}
                >
                    No, volver
                </Button>
            </Box>
        </Box>
    )
}