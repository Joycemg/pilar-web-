import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Avatar,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import NEXTIMAG from '../../assets/images/poke_next.png';
import api, { IMG_URL } from '../../services/api';
 

const getPokemonImgId = (id) => {
  switch (id.length) {
    case 1:
      return `00${id}`;
    case 2:
      return `0${id}`;
    default:
      return id;
  }
};

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const NextItem = ({ loadMore }) => {
  return (
    <Grid item xs={4}>
      <Card
        p={2}
        sx={{
          display: 'flex',
          height: 100,
          cursor: 'pointer',
          backgroundColor: '#317b52',
          '&:hover': { backgroundColor: '#5acdbd' },
        }}
        onClick={loadMore}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ color: 'white' }}>
            Cargar Más
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 100, p: 2 }}
          image={NEXTIMAG}
          alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
};

const Modal = ({ data, handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <p>{data ? data.name : '_'}</p>
        <Box sx={{ display: 'inline-flex' }}>
          <Avatar sx={{ width: 150, height: 150 }} src={data ? data.sprites.front_default : '_'}>
            P
          </Avatar>
          <Avatar sx={{ width: 100, height: 100 }} src={data ? data.sprites.back_default : '_'}>
            P
          </Avatar>
        </Box>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Habilidades</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data &&
              data.abilities &&
              data.abilities.map((h, index) => (
                <Typography key={index}>{h.ability.name}</Typography>
              ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Moviemientos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data &&
              data.moves &&
              data.moves.map((m, index) => <Typography key={index}>{m.move.name}</Typography>)}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

const Item = ({ data, openModal }) => {
  const path = data.url.split('/');
  const imgID = getPokemonImgId(path[6]);
  return (
    <Card
      p={2}
      sx={{
        display: 'flex',
        height: 100,
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#5acdbd', color: 'white' },
      }}
      onClick={() => openModal(data.url)}
    >
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          N° {imgID}
        </Typography>
        <Typography component="div" variant="h5">
          {data.name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        src={`${IMG_URL}${imgID}.png`}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export const FetchList = () => {
  const dispatcher = useDispatch();
  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');

  const handleClickOpen = async (url) => {
    try {
      // dispatchher(appActions.setLoading(true));
      const result = await api.GET(url);
      if (result) {
        setData(result);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(appActions.setLoading(false));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPokemons = async () => {
    try {
      // dispatcher(appActions.loading(true));
      const result = await api.GET(api.pokemons);
      if (result) {
        setPokemons(result.results);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatcher(appActions.loading(false));
    }
  };

  const loadMore = async () => {
    try {
      // dispatch(appActions.loading(true));
      const result = await api.GET(next);
      if (result) {
        console.log('poke: ', result.results);
        setPokemons((prev) => [...prev, ...result.results]);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(appActions.loading(false));
    }
  };

  useEffect(() => {
    getPokemons();
  }, [dispatcher]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            Mi Pokedex
          </Typography>
        </Grid>
        {pokemons &&
          pokemons.map((p, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Item data={p} openModal={handleClickOpen} />
              </Grid>
            );
          })}
        <NextItem loadMore={loadMore} />
      </Grid>
      <Modal data={data} handleClose={handleClose} open={open} />
    </>
  );
};
