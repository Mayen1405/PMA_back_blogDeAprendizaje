import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        enum: ['Tecnologia', 'Practica Supervisada', 'Taller'],
        required: true
    },
    comments:{
        type:[{
            name:{
                type: String,
                required: true,
                trim: true
            },
            comment:{
                type: String,
                required: true,
                trim: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }],
        default: []
    },
    date:{
        type: Date,
            default: () => new Date(new Date().setHours(0, 0, 0, 0)),
            set: (value) => new Date(new Date(value).setHours(0, 0, 0, 0))
    },
    status:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

publicationSchema.methods.ToJSON = function(){
    const { __v, _id, ...publication } = this.toObject();
    publication.id = _id;
    return publication;
}

export default model("Publication", publicationSchema);