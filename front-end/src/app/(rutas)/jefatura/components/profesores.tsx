"use client";
import { BottomNavigation, BottomNavigationAction, Box, Card, Typography, TextField, Button} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import __url from '@/lib/const';
import { Profesor } from '@/types/profesor';
import { Asignacion } from '@/types/asignacion';


interface NewProfessorState {
    nombre: string;
    segundoNombre: string;
    apellido: string;
    segundoApellido: string;
    mail: string;
    sede: string;
}

interface filas {
    professorName: string;
    mail: string;
    sede: string;
}
export default function Profesores(){

    const [viewValue, setViewValue] = useState<'ver' | 'crear'>('ver');
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
    const [finished, setFinished] = useState(true);
    const [filaSeleccionada, setFilaSeleccionada] = useState<filas>();
    const [showPageActualizar, setShowActualizarPage] = useState(false);
    //molde rellenable de la asignación
    const [newProfessor, setNewProfessor] = useState<NewProfessorState>({
        nombre: '',
        segundoNombre: '',
        apellido: '',
        segundoApellido: '',
        mail: '',
        sede: ''
    });
    
    //cargo los Profesores cada vez que finished esté en true, y reinicia el estado de finished en caso de que cambie a true
    useEffect(() => {
        if(!finished){
            return;
        }

        const Profesores = async () => { 
            try{
                const datos = await axios.get(`${__url}/profesor/todos`);
                setProfesores(datos.data);
                setFinished(prev => !prev);
            }catch(error){
                console.log(error);
            }
        };
        Profesores();
    }, [finished]);

    

    
    const filas = useMemo(() => {
        if (!profesores.length) return [];
        
        return profesores.map(pro => ({
            professorName: pro.nombre + " " + pro.segundoNombre + " " + pro.apellido + " " + pro.segundoApellido,
            mail: pro.mail,
            sede: pro.sede
        }));
        }, [profesores]);
    
    
    

    const ProfessorColumns: GridColDef<filas>[] = [
        { field: 'professorName', headerName: 'Profesor', width: 200 },
        { field: 'mail', headerName: 'Correo', width: 200},
        {field: 'sede', headerName: 'Sede', width: 200 },
        {field: 'eliminar', headerName: 'ACCIONES', width: 300, renderCell: (params)=>(
            <>
                <Button 
                size='small'
                onClick={() => eliminarFila(params.row.mail)}
                >
                    eliminar
                </Button>
                <Button
                size='small'
                onClick={() => {
                    setFilaSeleccionada(params.row)
                    setShowActualizarPage(true)
                }}
                >
                    Actualizar datos
                </Button>
            </>
        )}
    ];

    //borrar fila por mail
    const eliminarFila = async (mail: string) => {
    await axios.delete(`${__url}/profesor/borrar/${mail}`);
    setFinished(true); // fuerza recarga desde el backend
    };

    //envía la asignación a la db local
    const handleSubmitProfessor = async () => {
        // Validate required fields
        if (!newProfessor.mail || !newProfessor.nombre || !newProfessor.apellido || !newProfessor.segundoApellido || !newProfessor.sede) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }
        try {
            
            await axios.post(
                `${__url}/profesor/crear`,
                newProfessor
            );
            alert('Profesor agregado al sistema exitósamente!');
            // Reset form after successful (simulated) submission
            setNewProfessor({
                nombre: '',
                segundoNombre: '',
                apellido: '',
                segundoApellido: '',
                mail: '',
                sede: ''
            });
            setFinished(true);
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <Box sx={{ p: 3, width: '100%', height: '100%'}}>
            <Box sx={{ display:'flex', width: '100%', maxWidth: 500, borderTopLeftRadius:1 }}>
                    <BottomNavigation
                        showLabels
                        value={viewValue}
                        onChange={(event, newValue) => {
                            setViewValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Visualizar Profesores" value="ver" icon={<VisibilityIcon />} />
                        <BottomNavigationAction label="Agregar Profesor" value="crear" icon={<AddBoxIcon />} />
                    </BottomNavigation>
                    
                </Box>
            <Card sx={{ mb: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3 }}>
                

                {viewValue === "ver" && (
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            A continuación se muestran a los profesores.
                        </Typography>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={filas}
                                columns={ProfessorColumns}
                                getRowId= {(row) => row.mail }
                                pageSizeOptions={[5, 10, 20]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 }
                                    }
                                }}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Box>
                )}

                {viewValue === "crear" && (
                    <Box sx={{ mt: 2, width: '100%', maxWidth: "600px", height:'100%'}}>
                        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                            Aquí puedes agregar a los profesores nuevos.
                        </Typography>
                        <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
                            Al agregar a un profesor, se le permite la capacidad de ser asignado a un estudiante
                        </Typography>
                        <Box sx={{
                                display: 'grid',
                                gridTemplateRows: '1fr', // una columna para label+input
                                gap: 1,
                                p: 2, 
                                border: '1px solid #e0e0e0', 
                                borderRadius: 2 }}>
                            {/*Nombre completo del Profesor */}
                            <Box
                             sx={{
                                display:'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                gap:1,
                                justifyContent:'center'                             }}
                            >
                                <TextField
                                fullWidth
                                sx={{
                                    width:'130px'
                                }}
                                label="Primer Nombre"
                                value={newProfessor.nombre}
                                onChange={(e) =>
                                    setNewProfessor({
                                    ...newProfessor,
                                    nombre: e.target.value,
                                    })
                                }
                                size="small"
                                />
                                <TextField
                                fullWidth
                                sx={{
                                    width:'130px'
                                }}
                                label="Segundo Nombre"
                                value={newProfessor.segundoNombre}
                                onChange={(e) =>
                                    setNewProfessor({
                                    ...newProfessor,
                                    segundoNombre: e.target.value,
                                    })
                                }
                                size="small"
                                />
                                <TextField
                                fullWidth
                                sx={{
                                    width:'130px'
                                }}
                                label="Primer Apellido"
                                value={newProfessor.apellido}
                                onChange={(e) =>
                                    setNewProfessor({
                                    ...newProfessor,
                                    apellido: e.target.value,
                                    })
                                }
                                size="small"
                                />
                                <TextField
                                fullWidth
                                sx={{
                                    width:'130px'
                                }}
                                label="Segundo Apellido"
                                value={newProfessor.segundoApellido}
                                onChange={(e) =>
                                    setNewProfessor({
                                    ...newProfessor,
                                    segundoApellido: e.target.value,
                                    })
                                }
                                size="small"
                                />
                            </Box>
                            <Box
                             sx={{
                                display:'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap:3
                             }}
                            >
                            <Box
                            sx={{
                                display:'grid',
                                gridTemplateColumns: '1fr 2fr 1fr ',
                                gap:3
                             }}>
                            <TextField
                            fullWidth
                            sx={{
                                width:'190px'
                            }}
                            label="Sede (en minúsculas)"
                            value={newProfessor.sede}
                            onChange={(e) =>
                                setNewProfessor({
                                ...newProfessor,
                                sede: e.target.value,
                                })
                            }
                            size="small"
                            />
                            </Box>
                            <TextField
                            fullWidth
                            sx={{
                                width:'140px'
                            }}
                            label="Correo Profesor"
                            value={newProfessor.mail}
                            onChange={(e) =>
                                setNewProfessor({
                                ...newProfessor,
                                mail: e.target.value,
                                })
                            }
                            size="small"
                            />
                            </Box>
                            

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SendIcon />}
                                onClick={handleSubmitProfessor}
                                sx={{ mt: 2 }}
                            >
                                Agregar Profesor
                            </Button>
                        </Box>
                    </Box>
                )}
                {showPageActualizar && (
                    <ActualizarPage
                    fila={filaSeleccionada}
                    profesores={profesores}
                    action={() => setShowActualizarPage(false)}
                    ActionAction={()=> setFinished(prev => !prev)}
                    />
                )}
                
            </Card>
        </Box>
    )
}

interface newProfesor {
    nombre: string;
    segundoNombre: string;
    apellido: string;
    segundoApellido: string;
    sede: string;
}
type PageProps = {
   fila: filas | undefined;
   profesores: Profesor[];
   action: () => void;
   ActionAction: () => void; 
}

function ActualizarPage({action: onClose, fila, profesores, ActionAction: ActionAction}: PageProps){
    const [actualizado, setActualizado] = useState<newProfesor>({
        nombre: '',
        segundoNombre: '',
        apellido: '',
        segundoApellido: '',
        sede: ''
    });
    if(!fila){
        return;
    }
    const data = {
        nombre: actualizado.nombre || fila?.professorName.split(" ")[0],
        segundoNombre: actualizado.segundoNombre || fila?.professorName.split(" ")[1],
        apellido: actualizado. apellido || fila?.professorName.split(" ")[2],
        segundoApellido: actualizado.segundoApellido || fila?.professorName.split(" ")[3],
        sede: actualizado.sede || fila.sede
    }

    const actualizar = async() => {
        try{
            await axios.patch(`${__url}/profesor/actualizar/${fila.mail}`,
                data
            );
            ActionAction();
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Box
        sx={{
            backgroundColor:'white', 
            position:'absolute', 
            zIndex: 1001, 
            top:"70px",
            left:"500px",
            height:"400px",
            width:"1000px",
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
                flexDirection:'row',
                flexWrap:'wrap',
                gap:3
            }}
            >
                <TextField
                    label="Nombre"
                    placeholder={fila?.professorName.split(" ")[0] ?? ""}
                    value={actualizado.nombre}
                    onChange={(e) =>
                        setActualizado({
                            ...actualizado,
                            nombre: e.target.value
                        })
                    }
                />

                <TextField
                    label="Segundo Nombre"
                    placeholder={fila?.professorName.split(" ")[1] ?? ""}
                    value={actualizado.segundoNombre}
                    onChange={(e) =>
                        setActualizado({
                            ...actualizado,
                            segundoNombre: e.target.value
                        })
                    }
                />

                <TextField
                    label="Apellido"
                    placeholder={fila?.professorName.split(" ")[2] ?? ""}
                    value={actualizado.apellido}
                    onChange={(e) =>
                        setActualizado({
                            ...actualizado,
                            apellido: e.target.value
                        })
                    }
                />

                <TextField
                    label="Segundo Apellido"
                    placeholder={fila?.professorName.split(" ")[3] ?? ""}
                    value={actualizado.segundoApellido}
                    onChange={(e) =>
                        setActualizado({
                            ...actualizado,
                            segundoApellido: e.target.value
                        })
                    }
                />
                
            </Box>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                gap:3
            }}
            >
                <Typography
                sx={{
                    display:'flex',
                    alignItems:'center'
                }}
                >
                    {fila?.mail}
                </Typography>
                <TextField
                    label="Sede"
                    placeholder={fila?.sede ?? ""}
                    value={actualizado.sede}
                    onChange={(e) =>
                        setActualizado({
                            ...actualizado,
                            sede: e.target.value
                        })
                    }
                />
            </Box>
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                gap:2
            }}
            >
                <Button
                onClick={actualizar}
                variant='contained'
                >
                    Actualizar Datos
                </Button>
                <Button
                variant='contained'
                onClick={onClose}
                sx={{

                }}
                >
                    Volver
                </Button>
            </Box>
        </Box>
    )
}