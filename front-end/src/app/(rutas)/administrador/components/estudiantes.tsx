'use client'
import {Box, Card, Typography, Button, InputLabel, FormControl, Select, MenuItem, Input, BottomNavigation, BottomNavigationAction} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, useMemo} from 'react';
import { Asignacion } from '@/types/asignacion';
import { Estudiante } from '@/types/estudiante';
import axios from 'axios';
import __url from '@/lib/const';
import { Notas } from '@/types/notas';
import { Ficha } from '@/types/fichas_inscripcion';
import MoodBadTwoToneIcon from '@mui/icons-material/ClearOutlined';
import MoodTwoToneIcon from '@mui/icons-material/Done';
import estilo from "../style.module.css";
import { Guia } from '@/types/guias';
import { Informante } from '@/types/informante';
import { Tesis } from '@/types/tesis';
import { Estado } from '@/types/estados';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import { Profesor } from '@/types/profesor';


function Estudiantes() {
    
    const [showPageNota, setShowPageNota] = useState(false);
    const [showPageEstado, setShowPageEstado] = useState(false); 
    const [showPageExamen, setShowPageExamen] = useState(false);
    const [showPageDatos, setShowPageDatos] = useState(false);   
    const [showPageEliminar, setShowPageEliminar] = useState(false);
    const [filaSeleccionada, setFilaSeleccionada] = useState<filas>();
    
    interface filas {
        id: string;
        studentName: string;
        mail: string;
        estado: string;
        hora: string;
        fechaExamen: string;
    }
    
    const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [notas, setNotas] = useState<Notas[]>([]);
    const [fichas, setFichas] = useState<Ficha[]>([]);
    const [guias, setGuias] = useState<Guia[]>([]);
    const [informantes, setInformantes] = useState<Informante[]>([]);
    const [tesis, setTesis] = useState<Tesis[]>([]);
    const [estados, setEstados] = useState<Estado[]>([]);

    const [profeGuia, setProfeGuia] = useState<Profesor>();
    const [profeInformante, setProfeInformante] = useState<Profesor>();
    const [presidente, setPresidente] = useState<Profesor>();

    const [viewValue, setViewValue] = useState<'aceptados' | 'pendientes' | 'rechazados'>('pendientes');
    

    //traigo las asignaciones, los estudiante, los profesores, y los estados
    useEffect(() => {
    const datos_todos = async () => {
        try {
            const asigRes = await axios.get(`${__url}/asignaciones/todas`);
            const estuRes = await axios.get(`${__url}/estudiante/todos`);
            const notaRes = await axios.get(`${__url}/notas/todas`);
            const fichaRes = await axios.get(`${__url}/ficha/todas`);
            const guiaRes = await axios.get(`${__url}/guia/todas`);
            const infoRes = await axios.get(`${__url}/informante/todas`);
            const tesRes = await axios.get(`${__url}/tesis/todas`);
            const estRes = await axios.get(`${__url}/estados/todos`);
            setAsignaciones(asigRes.data);
            setEstudiantes(estuRes.data);
            setNotas(notaRes.data);
            setFichas(fichaRes.data);
            setGuias(guiaRes.data);
            setInformantes(infoRes.data);
            setTesis(tesRes.data);
            setEstados(estRes.data);
        } catch (error) {
            console.log(error);
        }
    };
    datos_todos();
}, []);

    //filtro a los estudiantes que estén aprobados
    const estuAprobados = useMemo(() => {
        const aprobados = estados.filter(est => est.estado === 'aceptado');

        return estudiantes.filter(est => aprobados.map(apr => apr.mailEstudiante).includes(est.mail))
    }, [estudiantes, estados]);
    
    //filtro a los estudiantes que estén pendientes
    const estuPendientes = useMemo(() => {
        const pendientes = estados.filter(est => est.estado === 'pendiente');

        return estudiantes.filter(est => pendientes.map(pen => pen.mailEstudiante).includes(est.mail))
    }, [estudiantes, estados]);

    //filtro a los estudiantes que estén rechazados
    const estuRechazados = useMemo(() => {
        const rechazados = estados.filter(est => est.estado === 'rechazado');

        return estudiantes.filter(est => rechazados.map(rec => rec.mailEstudiante).includes(est.mail))
    }, [estudiantes, estados]);


    //filtro las asignaciones que sean de estudiantes aceptados
    const asigsAprobados = useMemo(() => {
        return asignaciones.filter(asig => estuAprobados.map(apr => apr.mail).includes(asig.mailEstudiante));
    }, [asignaciones])

    //De las asignaciones de un estudiantes, solo mantengo una para que no se repita el estudiante por el numero de asignaciones asociadas a este
    const asigsUnicasAprobados = useMemo(() => {
            const asigUnicas: Asignacion[] = [];
            for(let i = 0; i < estudiantes.length; i++){
                const asigsEstu = asigsAprobados.filter(asig => asig.mailEstudiante === estudiantes[i].mail);
                if(asigsEstu.length >= 1){
                    asigUnicas.push(asigsEstu[0]);
                }
            }
            return asigUnicas;
        }, [asignaciones]);

    
    //filtro las asignaciones que sean de estudiantes pendientes
    const asigsPendientes = useMemo(() => {
        return asignaciones.filter(asig => estuPendientes.map(apr => apr.mail).includes(asig.mailEstudiante));
    }, [asignaciones])

    //De las asignaciones de un estudiantes, solo mantengo una para que no se repita el estudiante por el numero de asignaciones asociadas a este
    const asigsUnicasPendientes = useMemo(() => {
            const asigUnicas: Asignacion[] = [];
            for(let i = 0; i < estudiantes.length; i++){
                const asigsEstu = asigsPendientes.filter(asig => asig.mailEstudiante === estudiantes[i].mail);
                if(asigsEstu.length >= 1){
                    asigUnicas.push(asigsEstu[0]);
                }
            }
            return asigUnicas;
        }, [asignaciones]);
        

    //filtro las asignaciones que sean de estudiantes rechazados
    const asigsRechazados = useMemo(() => {
        return asignaciones.filter(asig => estuRechazados.map(apr => apr.mail).includes(asig.mailEstudiante));
    }, [asignaciones])

    //De las asignaciones de un estudiantes, solo mantengo una para que no se repita el estudiante por el numero de asignaciones asociadas a este
    const asigsUnicasRechazados = useMemo(() => {
            const asigUnicas: Asignacion[] = [];
            for(let i = 0; i < estudiantes.length; i++){
                const asigsEstu = asigsRechazados.filter(asig => asig.mailEstudiante === estudiantes[i].mail);
                if(asigsEstu.length >= 1){
                    asigUnicas.push(asigsEstu[0]);
                }
            }
            return asigUnicas;
        }, [asignaciones]);  

        const asigsUnicas = useMemo(() => {
            const asigUnicas: Asignacion[] = [];
                for(let i = 0; i < estudiantes.length; i++){
                    const asigsEstu = asignaciones.filter(asig => asig.mailEstudiante === estudiantes[i].mail);
                    if(asigsEstu.length >= 1){
                        asigUnicas.push(asigsEstu[0]);
                    }
                }
                return asigUnicas;
        }, [asignaciones])

    //Muestra si el estudiante tiene los documentos y las notas subidas, y revisa si estas ultimas son por encima del 4
    const docus_notas = (nombreEstu: string, rolNota: string) => {
        const nombre = nombreEstu.split("\n")[0] + " " + nombreEstu.split("\n")[1];
        if(!nombre){
            return;
        }
        const mailestudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === nombre)?.mail;
        
        
        if(!mailestudiante){
            return;
        }
        const asig = asigsUnicas.find(asig => asig.mailEstudiante === mailestudiante);
        if(!asig){
            return;
        }
       

        const grupoNotas = notas.find(nota => nota.mailEstudiante === asig.mailEstudiante);
        const notaGuia = grupoNotas?.notaGuia;
        const notaInformante = grupoNotas?.notaInformante
        const notaTesis = grupoNotas?.notaTesis;
        const notaOral = grupoNotas?.notaExamenOral;
        const notaFinal = grupoNotas?.notaFinal;
        
        let fila1;
        let fila2;
        let caja;
        switch (rolNota){
            case "notaGuia":
                const guia = guias.find(gui => gui.mailEstudiante === mailestudiante)?.nombreArchivo;
                if(guia){
                    fila1 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', }}>
                        <p className={estilo.p}>Rúbrica: </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                    ;
                }
                else{
                    fila1 =
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', }}>
                            <p className={estilo.p}>Rúbrica: </p>
                            <MoodBadTwoToneIcon sx={{color:'red'}}/>
                        </Box>
                    ;
                }

                if(Number(notaGuia) >= 4){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaGuia} </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                }else if(Number(notaGuia) < 4 || !notaGuia){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaGuia} </p>
                        <MoodBadTwoToneIcon sx={{color:'red'}}/>
                    </Box>
                }
                caja = 
                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center', 
                    width: '100%',
                    height: '100%',
                    gap: 0.5,
                    paddingY: '2px'}}
                    >
                        {fila1}
                        {fila2}
                    </Box>
                    return caja;
            case "notaInformante":
                const informante = informantes.find(inf => inf.mailEstudiante === mailestudiante)?.nombreArchivo;
                if(informante){
                    fila1 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Rúbrica: </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                    ;
                }
                else{
                    fila1 =
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', }}>
                            <p className={estilo.p}>Rúbrica: </p>
                            <MoodBadTwoToneIcon sx={{color:'red'}}/>
                        </Box>
                    ;
                }

                if(Number(notaInformante) >= 4){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaInformante} </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                }else if(Number(notaInformante) < 4 || !notaInformante){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaInformante} </p>
                        <MoodBadTwoToneIcon sx={{color:'red'}}/>
                    </Box>
                }
                caja = 
                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center', 
                    width: '100%',
                    height: '100%',
                    gap: 0.5,
                    paddingY: '2px'}}
                    >
                        {fila1}
                        {fila2}
                    </Box>
                    return caja;
            case "notaTesis":
                const tesi = tesis.find(tes => tes.mailEstudiante === mailestudiante)?.nombreArchivo;
                if(tesi){
                    fila1 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', }}>
                        <p className={estilo.p}>Tesis: </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                    ;
                }
                else{
                    fila1 =
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', }}>
                            <p className={estilo.p}>Tesis: </p>
                            <MoodBadTwoToneIcon sx={{color:'red'}}/>
                        </Box>
                    ;
                }

                if(Number(notaTesis) >= 4){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaTesis} </p>
                        <MoodTwoToneIcon sx={{color:'green'}}/>
                    </Box>
                }else if(Number(notaTesis) < 4 || !notaTesis){
                    fila2 = 
                    <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                        <p className={estilo.p}>Nota: {notaTesis} </p>
                        <MoodBadTwoToneIcon sx={{color:'red'}}/>
                    </Box>
                }
                caja = 
                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    gap: 0.5,
                    paddingY: '2px'}}
                    >
                        {fila1}
                        {fila2}
                    </Box>
                    return caja;
            
            case "ficha":
                const ficha = fichas.find(fic => fic.mailEstudiante === mailestudiante)?.nombreArchivo;
                if(ficha){
                    return <MoodTwoToneIcon sx={{color:'green'}} />
                }
                else{
                    return <MoodBadTwoToneIcon sx={{color:'red'}}/>
                }
            break;
            case "notaExamenOral":
                if(Number(notaOral) >= 4){
                    return(
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                            <p className={estilo.p}>Defensa: {notaOral} </p>
                            <MoodTwoToneIcon sx={{color:'green'}}/>
                        </Box>
                    )
                }else if(Number(notaOral) < 4 || !notaOral){
                    return( 
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                            <p className={estilo.p}>Defensa: {notaOral} </p>
                            <MoodBadTwoToneIcon sx={{color:'red'}}/>
                        </Box>
                    )
                }
                break;
            case "notaFinal":
                if(Number(notaFinal) >= 4){
                    return(
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                            <p className={estilo.p}>Nota: {notaFinal} </p>
                            <MoodTwoToneIcon sx={{color:'green'}}/>
                        </Box>
                    )
                }else if(Number(notaFinal) < 4 || !notaFinal){
                    return( 
                        <Box sx = {{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', }}>
                            <p className={estilo.p}>Nota: {notaFinal} </p>
                            <MoodBadTwoToneIcon sx={{color:'red'}}/>
                        </Box>
                    )
                }
                break;
            default:
            break;
        }
    }

    const assignmentColumns: GridColDef<filas>[] = [
        { field: 'id', headerName: 'id', width: 50},
        { field: 'studentName', headerName: 'Estudiante', width: 100, renderCell: (params) => (
            <Box style={{ 
                whiteSpace: 'pre-line',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }}>
                {params.value}
            </Box>
            )
        },
        { field: 'mail', headerName: 'Correo', width: 100},
        { field: 'estado', headerName: 'Estado', width: 90},
        { field: 'fechaExamen', headerName: 'Fecha Examen', width: 100},
        { field: 'hora', headerName: 'Hora Examen', width: 100},
        { field: 'ficha', headerName: 'Ficha Académica', width: 120, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )}
        },
        { field: 'notaGuia', headerName: 'Nota Guía', width: 100, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                     
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )}
        },
        { field: 'notaInformante', headerName: 'Nota Informante', width: 120, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )}
        },
        { field: 'notaTesis', headerName: 'Nota Tesis', width: 100, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )}
        },
        { field: 'notaExamenOral', headerName: 'Nota Defensa', width: 120, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )
        }},
        { field: 'notaFinal', headerName: 'Nota Final', width: 90, renderCell: (params) => {
            return(
                <Box sx = {{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%', gap:3}}>
                    {docus_notas(params.row.studentName, params.field)}
                </Box>
            )
        }},
        { field: 'Gestionamiento', headerName: 'Gestionamiento', width: 250, renderCell: (params) => {
            return(
                <Box
                sx ={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent: 'center',
                        alignItems:'center',
                        height:'100%'
                    }}
                >
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
                            setShowPageDatos(true);
                            setFilaSeleccionada(params.row);
                        }}
                        >
                            Datos estudiante
                        </Button>
                        <Button
                        sx={{color:'red'}}
                        onClick={() => {
                            setShowPageEliminar(true);
                            setFilaSeleccionada(params.row);
                        }}
                        >
                            ELIMINAR ESTUDIANTE
                        </Button>
                    </Box>
                    <Box
                    sx ={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                    >
                        <Button
                        onClick={() => 
                        {
                            setShowPageNota(true);
                            setFilaSeleccionada(params.row);
                        }
                        }
                        >
                            Colocar Nota
                        </Button>
                        <Button
                        onClick={() => {
                            setShowPageExamen(true);
                            setFilaSeleccionada(params.row)
                        }}>
                        Fecha examen
                        </Button>
                    </Box>
                    <Box
                    sx ={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                    >
                    <Button
                    onClick={() => {
                        setShowPageEstado(true);
                        setFilaSeleccionada(params.row);
                    }}
                    >
                        Cambiar Estado
                    </Button>
                    <Button
                    onClick={() => descargarActa(params.row)}
                    >
                        Descargar Acta
                    </Button>
                    </Box>
                </Box>
            )
        }}
    ];
    const nombreEstudiante = (est: Estudiante | null) => {
        if(!est){
            return "";
        }
    const nombre = `${est.nombre} ${est.segundoNombre}\n${est.apellido} ${est.segundoApellido}`

        return nombre;
    }

    const filasEstudiantesAceptados = useMemo(() => {
              if (!asigsUnicasAprobados.length) return [];
              const Filas = asigsUnicasAprobados.map(asig => {
                    const estudiante = estudiantes.find(est => est.mail === asig.mailEstudiante);
                    return {
                    id: asig.id,
                    studentName: nombreEstudiante(estudiante ?? null),
                    mail: estudiante?.mail ?? '---',
                    estado: estados.find(est => est.mailEstudiante === asig.mailEstudiante)?.estado ?? '',
                    hora: estudiante?.hora ?? 'No establecido',
                    fechaExamen: estudiante?.fechaExamen ?? 'No establecida'
                }
                
        });
              return Filas;
              }, [asigsUnicasAprobados, notas, estados, estudiantes]);
        
    const filasEstudiantesPendientes = useMemo(() => {
    if (!asigsUnicasPendientes.length) return [];
    const Filas = asigsUnicasPendientes.map(asig => {
            const estudiante = estudiantes.find(est => est.mail === asig.mailEstudiante);
            return {
            id: asig.id,
            studentName: nombreEstudiante(estudiante ?? null),
            mail: estudiante?.mail ?? '---',
            estado: estados.find(est => est.mailEstudiante === asig.mailEstudiante)?.estado ?? '',
            hora: estudiante?.hora ?? 'No establecido',
            fechaExamen: estudiante?.fechaExamen ?? 'No establecida'
        }
        
});
    return Filas;
    }, [asigsUnicasPendientes, notas, estados, estudiantes]);

    const filasEstudiantesRechazados = useMemo(() => {
        if (!asigsUnicasRechazados.length) return [];
        const Filas = asigsUnicasRechazados.map(asig => {
                const estudiante = estudiantes.find(est => est.mail === asig.mailEstudiante);
                return {
                id: asig.id,
                studentName: nombreEstudiante(estudiante ?? null),
                mail: estudiante?.mail ?? '---',
                estado: estados.find(est => est.mailEstudiante === asig.mailEstudiante)?.estado ?? '',
                hora: estudiante?.hora ?? 'No establecido',
                fechaExamen: estudiante?.fechaExamen ?? 'No establecida'
            }
            
    });
        return Filas;
        }, [asigsUnicasRechazados, notas, estados, estudiantes]);
    
    const callActualizado = async(tipoCall: string) => {
        if(!tipoCall){
            return;
        }
        if(tipoCall === 'nota'){
            const actualizado = await axios.get(`${__url}/notas/todas`);
            setNotas(actualizado.data)
        }
        else if(tipoCall === 'estado'){
            const actualizado = await axios.get(`${__url}/estados/todos`);
            setEstados(actualizado.data)
        }
        else if(tipoCall === 'examen' || 'estudiante'){
            const actualizado = await axios.get(`${__url}/estudiante/todos`);
            setEstudiantes(actualizado.data)
        }
        
    }
    
    const descargarActa = async(fila: filas) => {
        const estudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === fila.studentName );
        if(!estudiante){
            return;
        }
        
        const grupoNotas = notas.find(nota => nota.mailEstudiante === fila.mail);
        const notaGuia = grupoNotas?.notaGuia;
        const notaInformante = grupoNotas?.notaInformante
        const notaTesis = grupoNotas?.notaTesis;
        const mailPresidente = asignaciones.find(asig => asig.mailEstudiante === estudiante.mail && asig.rol === 'presidente')?.mailProfesor;
        const mailGuia = asignaciones.find(asig => asig.mailEstudiante === estudiante.mail && asig.rol === 'guia')?.mailProfesor;
        const mailInformante = asignaciones.find(asig => asig.mailEstudiante === estudiante.mail && asig.rol === 'informante')?.mailProfesor;
        if(!mailGuia){
            return;
        }
        if(!mailInformante){
            return;
        }
        if(!mailPresidente){
            return;
        }
        const responseGuia = await axios.get(`${__url}/profesor/${mailGuia}`);
        setProfeGuia(responseGuia.data);
        const responseInformante = await axios.get(`${__url}/profesor/${mailInformante}`);
        setProfeInformante(responseInformante.data);
        const responsePresidente = await axios.get(`${__url}/profesor/${mailPresidente}`);
        setPresidente(responsePresidente.data);
        if(!profeGuia){
            return;
        }
        if(!profeInformante){
            return;
        }
        if(!presidente){
            return;
        }
        if(!notaGuia){
            alert('Falta la nota del Guia');
            return;
        }else if(!notaInformante){
            alert('Falta la nota del Informante');
            return;
        }else if(!notaTesis){
            alert('Falta la nota de la Tesis');
            return;
        }
        const response = await axios.post(`${__url}/word/acta`, {
            nombre: fila.studentName,
            notaGuia: String(notaGuia),
            notaInformante: String(notaInformante),
            notaFinal: String(notaTesis),
            tema_Tesis: estudiante.tema_Tesis,
            profeGuia: (profeGuia?.nombre + " " + profeGuia?.apellido + " " + profeGuia?.segundoApellido),
            profeInformante: (profeInformante.nombre + " " + profeInformante.apellido + " " + profeInformante.segundoApellido),
            presidente: (presidente.nombre + " " + presidente.apellido + " " + presidente.segundoApellido) 
        },
    {
        responseType: 'blob'
    }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `acta_${fila.studentName}.docx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    }
    return (
        <Box sx={{  width: '100%' }}>
            <BottomNavigation
                        showLabels
                        value={viewValue}
                        onChange={(event, newValue) => {
                            setViewValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Visualizar aceptados" value="aceptados" icon={<TagFacesRoundedIcon />} />
                        <BottomNavigationAction label="Visualizar pendientes" value="pendientes" icon={<SentimentNeutralRoundedIcon />} /> 
                        <BottomNavigationAction label="Visualizar rechazados" value="rechazados" icon={<SentimentVeryDissatisfiedRoundedIcon />} />
                    </BottomNavigation>
            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        A continuación se muestran los estudiantes actuales en el sistema
                    </Typography>
                    
                        {showPageNota && (
                            
                            <ChangePage
                            action={() => setShowPageNota(false)}
                            fila={filaSeleccionada}
                            estudiantes={estudiantes}
                            ActionAction={() => callActualizado('nota')}
                            />
                        )}
                        {showPageEstado && (

                            <StatePage
                            action={() => setShowPageEstado(false)}
                            fila={filaSeleccionada}
                            estudiantes={estudiantes}
                            ActionAction={() => callActualizado('estado')}
                            />
                        )}
                        {showPageExamen && (
                            <ExamenPage
                            action={() => setShowPageExamen(false)}
                            fila={filaSeleccionada}
                            estudiantes={estudiantes}
                            ActionAction={() => callActualizado('examen')}
                            />
                        )}
                        {showPageDatos && (
                            <DatosPage
                            action={() => setShowPageDatos(false)}
                            fila={filaSeleccionada}
                            estudiantes={estudiantes}
                            />
                        )}
                        {showPageEliminar && (
                            <DeletePage
                            action={() => setShowPageEliminar(false)}
                            fila={filaSeleccionada}
                            estudiantes={estudiantes}
                            ActionAction={() => callActualizado('estudiante')}
                            />
                        )}
                        {viewValue === 'pendientes' && (
                            <DataGrid
                            sx={{
                                position:'relative',
                                left:0
                            }}
                            rows={filasEstudiantesPendientes}
                            columns={assignmentColumns}
                            pageSizeOptions={[5, 10, 20]}
                            getRowId= {(row) => row.id }
                            rowHeight={100}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 }
                                }
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                        )}
                        {viewValue === 'aceptados' && (
                            <DataGrid
                            sx={{
                                position:'relative',
                                left:0
                            }}
                            rows={filasEstudiantesAceptados}
                            columns={assignmentColumns}
                            pageSizeOptions={[5, 10, 20]}
                            getRowId= {(row) => row.id }
                            rowHeight={100}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 }
                                }
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                        )}
                        {viewValue === 'rechazados' && (
                            <DataGrid
                            sx={{
                                position:'relative',
                                left:0
                            }}
                            rows={filasEstudiantesRechazados}
                            columns={assignmentColumns}
                            pageSizeOptions={[5, 10, 20]}
                            getRowId= {(row) => row.id }
                            rowHeight={100}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 }
                                }
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                        )}
                    
                </Box>
            </Card >
        </Box >
    );
}
export interface filas{
    id: string;
    studentName: string;
    estado: string;
    hora: string;
    fechaExamen: string;
}
type PageProps = {
    fila: filas | undefined;
    estudiantes: Estudiante[];
    action: () => void;
    ActionAction: () => void;
}
type DatosPageProps = {
    fila: filas | undefined;
    estudiantes: Estudiante[];
    action: () => void;
}
export function ChangePage({action: onClose, fila, estudiantes, ActionAction: ActionAction}: PageProps){
    const [nota, setNota] = useState("");
    const [tipoNota, setTipoNota] = useState("")
    if(!fila){
        return;
    }
    const mailEstudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === (fila.studentName.split("\n")[0] + " "+ fila.studentName.split("\n")[1]))?.mail;
    
    if(!mailEstudiante){
        return null;
    }
    const guardar = async (nota: string) => {
        try {
            const valor = Number(nota);
            await axios.patch(`${__url}/notas/actualizar`, {
            mailEstudiante,
            tipoNota: tipoNota,
            valor
            });
            ActionAction();

        } catch (error) {
            console.error(error);
            alert("Error al guardar la nota");
        }
    };
      return(
        <Box sx={{
              backgroundColor:'white', 
              position:'absolute', 
              zIndex: 1000, 
              top:"70px",
              left:"1000px",
              height:"250px",
              width:"450px",
              borderRadius:'10px',
              borderColor:'black',
              border:1,
            }}>
            <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
                Seleccione el tipo de nota que quiere cambiar
            </Typography>
            <FormControl fullWidth required> {/* Wrap rol Select in FormControl */}
                <InputLabel id="rol-select-label">Rol</InputLabel> {/* New InputLabel for Rol */}
                <Select
                    labelId="rol-select-label"
                    id="rol-select"
                    name="rol" // Important: Set the name to "rol"
                    value={tipoNota}
                    onChange={(e) => setTipoNota(e.target.value)}
                    label="Rol" // Label for the Select component
                    
                >
                    <MenuItem value=""><em>Selecciona una Nota</em></MenuItem>
                    <MenuItem value="notaGuia">Guía</MenuItem>
                    <MenuItem value="notaInformante">Informante</MenuItem>
                    <MenuItem value="notaExamenOral">Defensa</MenuItem>
                </Select>
            </FormControl>
            <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
                Ingrese la nota
            </Typography>
            <Box sx = {{
                display: 'flex',
                justifyContent:'center'
            }}>
                <Input 
                placeholder='Ejemplo: 6.5'
                inputProps={{ style: { textAlign: 'center' } }}
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                />
            </Box>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                position:'relative',
                top:'20px'
            }}
            >
                <Button
                onClick={() => guardar(nota)}
                >
                    GUARDAR    
                </Button>  
                <Button
                onClick={() => onClose()}>
                    CERRAR
                </Button>
            </Box>
            
        </Box>
    )
}

export function DeletePage({action: onClose, fila, estudiantes, ActionAction: ActionAction}: PageProps){
    if(!fila){
        return;
    }
    const nombre = fila.studentName.split("\n")[0] + " " + fila.studentName.split("\n")[1];
    const estudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === nombre);
    
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
                {nombre} del Sistema de 
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
                onClick={borrarEstudiante}
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
export function StatePage({action: onClose, fila, estudiantes, ActionAction: ActionAction}: PageProps){
    if(!fila){
        return;
    }
    const nombre = fila.studentName.split("\n")[0] + " " + fila.studentName.split("\n")[1];
    const mailEstudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === nombre)?.mail;
    const guardar = async(estado: string) => {
        try {
            await axios.patch(`${__url}/estados/actualizar`, {
                mailEstudiante,
                estado
            });
            ActionAction();
        } catch (error) {
            console.log(error);
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
            <Box
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <Typography variant='h3'>
                    Escoja el estado
                </Typography>
            </Box>
            <Box
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'row',
                gap:3
            }}
            >
                <Button
                onClick={() => guardar('aceptado')}
                sx={{
                    backgroundColor:'green',
                    color:'white'
                }}
                >
                    Aceptado
                </Button>
                <Button
                onClick={() => guardar('pendiente')}
                sx={{
                    backgroundColor:'chocolate',
                    color:'white'
                }}
                >
                    Pendiente
                </Button>
                <Button
                onClick={() => guardar('rechazado')}
                sx={{
                    backgroundColor:'red',
                    color:'white'
                }}
                >
                    Rechazado
                </Button>
            </Box>
            <Box
            sx={{
                position:'relative',
                left:'170px',
                top:'20px'
            }}
            >   
                <Button
                onClick={() => onClose()}
                >
                    Cerrar
                </Button>
            </Box>
        </Box>
    )
}

export function ExamenPage({action: onClose, fila, estudiantes, ActionAction: ActionAction}: PageProps){
    
    const [dia, setDia] = useState("");
    const [hora, setHora] = useState("");
    if(!fila){
        return;
    }
    
    
    const estudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === (fila.studentName.split("\n")[0] + " " + fila.studentName.split("\n")[1]));
    if(!estudiante){
        return;
    }
    const guardar = async() => {
        try {
            const diaExa = dia.split("/")[0];
            const mesExa = dia.split("/")[1];
            const añoExa = String(new Date().getFullYear());
            const fechaExamen = diaExa + "/" + mesExa + "/" + añoExa;
            
            await axios.patch(`${__url}/estudiante/actualizar/${estudiante.rut}`,{
                mail: estudiante.mail,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                rut: estudiante.rut,
                hora,
                fechaExamen
            })
            ActionAction();

        } catch (error) {
            console.log(error);
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
            <Typography variant='h5' textAlign={'center'}>
                Indique fecha y hora del examen del estudiante
                <br/>
                {fila.studentName}
            </Typography>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:3
            }}
            >
               <Input 
                placeholder='Ejemplo: 05/06'
                inputProps={{ style: { textAlign: 'center' } }}
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                /> 
                <Input
                placeholder='Ejemplos: 15:45 , 09:20'
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                inputProps={{style: {width:'160px'}}}
                />
            </Box>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:2
            }}
            >
                <Button
                onClick={guardar}
                >
                    guardar
                </Button>
                <Button
                onClick={onClose}
                >
                    cerrar
                </Button>
            </Box>
            
        </Box>
    )
}

export function DatosPage({action: onClose, fila, estudiantes}: DatosPageProps){
    if(!fila){
        return;
    }
    const nombre = fila.studentName.split("\n")[0] + " " + fila.studentName.split("\n")[1];
    const estudiante = estudiantes.find(est => (est.nombre + " " + est.segundoNombre + " " + est.apellido + " " + est.segundoApellido) === nombre);
    
    return(
        <Box
        sx={{
            backgroundColor:'white', 
              position:'absolute', 
              zIndex: 1001, 
              top:"70px",
              left:"1000px",
              height:"400px",
              width:"400px",
              borderRadius:'10px',
              borderColor:'black',
              border:1,
              display:'flex',
              flexDirection:'column',
              gap:4
        }}
        >
            <Typography variant='h6'>
                <Box>
                    Correo Institucional: {estudiante?.mail}
                    <br/>
                    Correo Personal: {estudiante?.mailPersonal}
                    <br/>
                    Número Celular: {estudiante?.celular}
                    <br/>
                    Rut: {estudiante?.rut}
                    <br/>
                    Código Carrera: {estudiante?.codigo}
                    <br/>
                    Número Resolución: {estudiante?.nroResolucion}
                    <br/>
                    Año Ingreso : {estudiante?.agnoIngreso}
                    <br/>
                    Año Egreso: {estudiante?.agnoEgreso}
                    <br/>
                    Fecha Examen: {estudiante?.fechaExamen} a las {estudiante?.hora}
                    <br/>
                    Sede: {estudiante?.sede}
                    <br/>
                    Semestre: {estudiante?.semestre}
                </Box>
            </Typography>
            <Box
            sx={{
                position:'relative',
                bottom:'20px',
                left:'320px'

            }}
            >
                <Button
                onClick={onClose}
                >
                    cerrar
                </Button>
            </Box>
                
        </Box>
    )
}

export default Estudiantes;