import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Stack,
  CardHeader,
  Typography,
  Checkbox,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { appSelector, appActions } from '../../reducers/appRedux';
import { v4 as uuid } from 'uuid';

export const Todo = () => {
  const dispatch = useDispatch();
  const todo = useSelector(appSelector.todo);
  const [text, setText] = useState(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChecked = (e, id) => {
    dispatch(appActions.setCompletedTodo({ id, completed: e.target.checked }));
  };

  const addTask = () => {
    dispatch(appActions.addTodo({ text: text, id: uuid() }));
    setText(null);
  };

  const delTask = (id) => {
    dispatch(appActions.deleteTodo(id));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Card>
            <CardHeader title="Agrega una tarea" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <TextField
                    value={text}
                    label="tarea"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={9}>
                  <Button disabled={!text} variant="contained" onClick={() => addTask()}>
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card>
            <CardHeader title="Tareas" />
            <CardContent>
              {todo.map((t, index) => (
                <Stack
                  key={t.id}
                  sx={{ justifyContent: 'space-between' }}
                  direction="row"
                >
                  <Grid item md={0}>
                    <Checkbox onChange={(e) => handleChecked(e, t.id)} />
                  </Grid>
                  <Grid item md={4} sx={{ pt: 1 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                      {t.text}
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Button variant="contained" onClick={() => delTask(t.id)}>
                      Eliminar
                    </Button>
                  </Grid>
                </Stack>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
