// @ts-nocheck
import "./lifeguardList.css"
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Link, useNavigate } from "react-router-dom";
import { TableHead } from "@mui/material";
import { request } from "../../utils/axios_helper";

function TablePaginationActions(props) {    
  
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  

export default function LifeguardList(){
    const [loadingData, setLoadingData] = React.useState(false);
    const [sortBy, setSortBy] = React.useState("dni");
    const [totalResults, setTotalResults] = React.useState(0);
    const [rows, setRows] = React.useState(undefined);

    const [page, setPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [emptyRows, setEmptyRows] = React.useState(0);
    const navigate = useNavigate()
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getAllPersons(newPage, rowsPerPage, sortBy)
    }
                
    React.useEffect(()=>{
        getAllPersons(page, rowsPerPage, sortBy)        
    }, [])

    React.useEffect(()=>{
        getAllPersons(page, rowsPerPage, sortBy)        
    }, [rowsPerPage])

  function getAllPersons(page, rowsPerPage, sortBy){       
    setLoadingData(true) 
    request(
        "GET",
        `auth/lifeguards?page=${page? page : ''}&size=${rowsPerPage? rowsPerPage : ''}&sortBy=${sortBy? sortBy  : ''}`,
        {})
        .then((response) => {  
            setRows(response.data.users)     
            setPage(response.data.current_page)
            setTotalPages(response.data.pages)
            setSortBy(response.data.sort_by)
            setRowsPerPage(response.data.results_per_page)
            setTotalResults(response.data.total_results)
            setLoadingData(false)      
            

            if(response.data.pages-1 == response.data.current_page){
                // si la pagina actual es la ultima pagina, creo filas vacias para evitar saltos al llegar a una pagina incompleta 
                setEmptyRows(Number(response.data.results_per_page - response.data.users?.length+1))
                if(Number(response.data.total_results)  < Number(response.data.results_per_page)){
                    setEmptyRows(0)            
                }
            } else{
                setEmptyRows(0)
            }            
        })
        .catch((error) => {
            console.log ("***********>>> "+error)    
            setLoadingData(false) 
        }
    )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Dni</TableCell>
            <TableCell align="center">Nombre y Apellido</TableCell>
            <TableCell align="center">Telefono </TableCell>
            <TableCell align="center">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
          {rows ? rows.map((row) => (            
            <TableRow key={row.id} sx={{ height: '100px' }}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell  align="center">
                {row.username}
              </TableCell>
              <TableCell  align="center">
                {row.dni}
              </TableCell>
              <TableCell  align="center">
                {`${row.firstName}, ${row.lastName}`}
              </TableCell>
              <TableCell  align="center">
                {row.phone}
              </TableCell>             
              <TableCell  align="center">
                {row.email} 
              </TableCell>         
            </TableRow>
          )) : (<h3>No hay usuarios cargados con el rol de guardavidas</h3>) }
          
          {emptyRows && (
            <TableRow style={{ height: 82 * emptyRows}}>
                <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={totalResults}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}