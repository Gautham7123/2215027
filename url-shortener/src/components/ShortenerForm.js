import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";
import { saveUrl } from '../storage';
function ShortenerForm() {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };
  const addMore = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };
  const shorten = () => {
    const newResults = urls.map((u) => {
      if (!u.longUrl.startsWith("http")) {
        logger.error("Invalid URL", u.longUrl);
        alert("Invalid URL! Must start with http or https");
        return null;
      }
      const code = u.shortcode ? u.shortcode : uuidv4().slice(0, 6);
      const expiry = u.validity ? parseInt(u.validity) : 30; // default 30 minutes
      const expiryTime = Date.now() + expiry * 60 * 1000;
      const data = { ...u, shortcode: code, expiryTime };
      saveUrl(data); // <-- changed from saveURL to saveUrl
      logger.info("Shortened URL created", data);
      return data;
    }).filter(Boolean);
    setResults(newResults);
  };
  return(
    <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5">React URL Shortener</Typography>
        {urls.map((u, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <TextField
              label="Long URL"
              value={u.longUrl}
              fullWidth
              onChange={(e) => handleChange(i, "longUrl", e.target.value)}
              sx={{ marginBottom: "5px" }}
            />
            <TextField
              label="Validity (minutes)"
              type="number"
              value={u.validity}
              fullWidth
              onChange={(e) => handleChange(i, "validity", e.target.value)}
              sx={{ marginBottom: "5px" }}
            />
            <TextField
              label="Custom Shortcode"
              value={u.shortcode}
              fullWidth
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
              sx={{ marginBottom: "5px" }}
            />
          </div>
        ))}
        <Button onClick={addMore} disabled={urls.length >= 5}>Add More</Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={shorten}>Shorten</Button>
        {results.length>0 && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Results:</Typography>
            {results.map((r, i) => (
              <div key={i}>
                <a href={`/r/${r.shortcode}`} target="_blank" rel="noreferrer">
                  {window.location.origin}/r/{r.shortcode}
                </a>
                <p>Expires in:{new Date(r.expiryTime).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default ShortenerForm;
