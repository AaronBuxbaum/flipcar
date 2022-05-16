import { Link } from "@remix-run/react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating } from '@mui/material';
import type { getCarListItems } from "~/models/car.server";

interface Props {
  car: Awaited<ReturnType<typeof getCarListItems>>[number];
}

const CarCard = ({ car }: Props) => {
  return (
    <Link to={car.id}>
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={car.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">{car.title}</Typography>
            {car.mechanic && <Rating value={car.mechanic.ratings} readOnly />}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default CarCard;
