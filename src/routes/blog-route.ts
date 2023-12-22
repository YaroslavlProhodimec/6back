import {Router, Request, Response} from "express";
import {BlogParams} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogPostValidation, idParamsValidation} from "../validators/blogs-validator";

export const blogRoute = Router({})

blogRoute.get('/blogs',async (req: Request, res: Response) => {
    const blogs = await BlogRepository.getAllBlogs()
    res.status(200).send(blogs)
})
blogRoute.get('/blogs/:id',idParamsValidation,async (req: Request<BlogParams>, res: Response) => {
    const id = req.params.id
    const blog = await BlogRepository.getBlogsById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    res.send(blog)
})

blogRoute.post('/blogs',authMiddleware,blogPostValidation(),async (req: Request, res: Response) => {
    const blogs = await  BlogRepository.addBlog(req.body)
    res.status(201).send(blogs)
})

blogRoute.delete('/blogs/:id',authMiddleware,idParamsValidation,async (req: Request<BlogParams>, res: Response) => {

    const blogs = await BlogRepository.deleteBlog(req.params.id)

    if(!blogs){
        res.sendStatus(404)
    }
    res.sendStatus(204)
})
blogRoute.put('/blogs/:id',authMiddleware,blogPostValidation(),idParamsValidation,async (req: Request<BlogParams>, res: Response) => {

    const blogs = await BlogRepository.updateBlogs(req.params.id,req.body)

    if (!blogs) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})


