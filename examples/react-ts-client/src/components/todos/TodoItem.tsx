import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { TodoWithId } from '@/types';

interface TodoItemProps {
  todo: TodoWithId;
  children: React.ReactNode;
}

export default function TodoItem({ todo, children }: TodoItemProps) {
  return (
    <Card key={todo._id.toString()} sx={{ margin: '0.5rem', minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {todo.done && '✅'} {todo.content}
        </Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  );
}
