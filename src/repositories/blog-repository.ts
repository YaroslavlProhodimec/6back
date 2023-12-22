import {blogCollection,} from '../db/db'
import {BlogType, OutputBlogType} from "../types/blog/output";
import {v4 as uuidv4} from 'uuid';
import {ObjectId} from "mongodb";
import {blogMapper} from "../types/blog/mapper";
import {UpdatePostData} from "../types/post/input";
import {updateOutput} from "ts-jest/dist/legacy/compiler/compiler-utils";
import {UpdateBlogData} from "../types/blog/input";

export class BlogRepository {

    static async getAllBlogs() {
        return await blogCollection.find({}).toArray()
    }

    static async getBlogById(id: string): Promise<OutputBlogType | null> {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return null
        }
        return blogMapper(blog)
    }

    static addBlog(blog: BlogType) {
        const existingBlog = db.blogs.find((b) => b.id === blog.id);
        if (existingBlog) {
            return {...existingBlog, id: existingBlog.id};
        }
        const newBlog = {...blog, id: generateUniqueId()}
        db.blogs.push(newBlog)
        return {...newBlog}
    }

    static async updateBlog(id: string, updateData: UpdateBlogData): Promise<boolean> {
        let result = await blogCollection.updateOne({_id: new Object(id)}, {
            $set: {
                name: updateData.name,
                description: updateData.description,
                websiteUrl: updateData.websiteUrl,
            }
        })
        return !!result.matchedCount
    }

    static async deleteBlog(id: string) {
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return !!result.deletedCount
    }

}

export function generateUniqueId(): string {
    const fullUUID = uuidv4();
    return fullUUID.slice(0, 28);
}

