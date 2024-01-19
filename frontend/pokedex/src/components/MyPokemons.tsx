import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TableFooter, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { getPaginatedPokemons } from '../store/slices/pokemon';
import DeletePokemon from './DeletePokemon';
import UpdatePokemon from './UpdatePokemon';
import ExportPokemon from './ExportPokemon';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? '>' : '<'}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? '<' : '>'}
      </IconButton>

    </Box>
  );
}

export default function GetMyPokemons(props: Record<string, any>) {

  const { myPokemons } = props;

  const dispatch: any = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    dispatch(getPaginatedPokemons(newPage, rowsPerPage))
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getPaginatedPokemons(page, parseInt(event.target.value, 10)))
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Alias</strong></TableCell>
            <TableCell><strong></strong></TableCell>
            <TableCell><strong></strong></TableCell>
            <TableCell><strong></strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myPokemons.map((pokemon: any) => (
            <TableRow
              key={pokemon.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{pokemon.name}</TableCell>
              <TableCell>{pokemon.alias}</TableCell>
              <TableCell>
                <UpdatePokemon name={pokemon.name} id={pokemon._id} alias={pokemon.alias}/>
              </TableCell>
              <TableCell>
                <ExportPokemon name={pokemon.name} id={pokemon._id}/>
              </TableCell>
              <TableCell>
                <DeletePokemon name={pokemon.name} id={pokemon._id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
              colSpan={3}
              count={myPokemons.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
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