import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { pokemonApi } from '../api/pokemoApi';
import { useDispatch } from 'react-redux';
import { getMyPokemons } from '../store/slices/pokemon';

export default function UpdatePokemon(props: any) {
  
  const dispatch: any = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePokemon = async (alias: string) => {
    await pokemonApi.put(`${props.id}`, {alias});
    dispatch(getMyPokemons())
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const text = formJson.text;
            handleClose();
            handleUpdatePokemon(text);
          },
        }}
      >
        <DialogTitle>¿Editar Pokemon?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agrega un alias a <strong>{props.name}</strong>.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Alias"
            type="text"
            fullWidth
            variant="standard"
            name="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}