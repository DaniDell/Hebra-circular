import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Label from "./Utils/Label";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const StackedCard = ({
  title,
  subtitle,
  description,
  image,
  instagramLink,
  linkedinLink,
  redirection,
  ods,
  category,
  ...props
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 5,
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
        paddingLeft: "16px",
        paddingBottom: "6px",
        paddingTop: "6px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="actor"
            src={image[0]}
            sx={{
              width: 60,
              height: 60,
              img: {
                objectFit: "contain",
              },
            }}
          >
            {image}
          </Avatar>
        }
        action={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              padding: "10px",
            }}
          >
            {instagramLink && (
              <Link to={instagramLink}>
                <IconButton aria-label="instagram">
                  <InstagramIcon />
                </IconButton>
              </Link>
            )}
            {linkedinLink && (
              <Link to={linkedinLink}>
                <IconButton aria-label="linkedin">
                  <LinkedInIcon />
                </IconButton>
              </Link>
            )}
            <IconButton
              aria-label="share"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "Mira este proyecto!",
                      url: window.location.href,
                    });
                  } catch (error) {
                    console.error("Error sharing:", error);
                  }
                } else {
                  console.log("Web Share API not supported.");
                }
              }}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        }
        title={
<Typography variant="h6" align="left" style={{ fontWeight: 'bold' }}>
    {title}
</Typography>
        }
        subheader={
<Typography
    variant="subtitle1"
    align="left"
    sx={{ paddingRight: "10px", lineHeight: '1.2' }}
>
    {subtitle}
</Typography>
        }
        sx={{ padding: "6px" }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          paddingLeft: 2,
          justifyContent: "left",
        }}
      >
        {Array.isArray(ods) &&
          ods.map((od, index) => (
            <Label key={index} text={od.text} backgroundColor={od.color} />
          ))}
      </Box>

      <CardActions
        disableSpacing
        sx={{ height: "50px", backgroundColor: "transparent" }}
      >
        <Typography
          variant="body1"
          align="center"
          style={{ marginLeft: 12, fontSize: "13px" }}
        >
          {Array.isArray(category) &&
            category.map((cat) => cat.symbol).join(" | ")}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ cursor: "pointer" }}
        >
          <ExpandMoreIcon fontSize="large" />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {loading && <CircularProgress />}
          <CardMedia
            component="img"
            height="280"
            image={image.length > 1 ? image[1] : image[0]}
            alt={title}
            onLoad={() => setLoading(false)}
          />
          <Typography paragraph></Typography>
          <Typography variant="body2" paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default StackedCard;
