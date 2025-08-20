import React from "react";
import { Card, CardContent, Typography } from "@mui/material";   
import { getUrls } from "../storage";
import { Link } from "react-router-dom";
import logger from "../logger";
function Startspage() {
    const urls = getUrls();
    return(
        <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
            <CardContent>
            <Typography variant="h5">SHORTENEND URLs Statistics</Typography>
            {urls.length === 0 ? (
          <p>No URLs created yet</p>
        ):(
        urls.map((u, i) => (
            <div key={i} style={{ margin:"10px 0"}}>
            <p>Original: {u.longUrl}</p>
            <p>Short: {window.location.origin}/r/{u.shortcode}</p>
            <p>Expires: {new Date(u.expiryTime).toLocaleString()}</p>
            </div>
          ))
        )} 
        </CardContent>
        </Card>
    );
}
export default Startspage;