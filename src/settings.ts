import express, {Request, Response} from "express";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";

export const app = express()

app.use(express.json())
app.use(blogRoute)
app.use(postRoute)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    clearAllData();
    res.sendStatus(204)
        // .send('All data is deleted');
})

