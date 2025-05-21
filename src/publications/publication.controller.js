import Publication from "./publication.model.js";

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
        let pubPicture = req.file ? req.file.filename : null;
        data.image = pubPicture;

        const publication = new Publication(data);
        await publication.save();
        
        return res.status(201).json({
            success: true,
            message: "Publicación creada correctamente",
            publication
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la publicación",
            error
        })
    }
}

export const getPublications = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { status: true };
        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .sort({date: -1})
        ])

        return res.status(200).json({
            success: true,
            message: "Publicaciones obtenidas correctamente",
            total,
            publications
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error
        })
    }
}

export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }
        return res.status(200).json({
            success: true,
            publication
        })

    }catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
            error
        })
    }
}

export const filterPublications = async (req, res) => {
    try {
        const { course, title, sortByDate, startDate, endDate } = req.query;

        const query = { status: true,
            ...(course ? { course } : {}),
            ...(title ? { title: { $regex: title, $options: "i" }} : {}),
            ...(startDate && endDate
            ? { date: { $gte: new Date(startDate), $lte: new Date(endDate) } }
            : startDate
            ? { date: { $gte: new Date(startDate), $lt: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1)) } }
            : {})
        }

        const sort = sortByDate === "asc" ? { date: 1 } : { date: -1 };

        const publications = await Publication.find(query).sort(sort);

        return res.status(200).json({
            success: true,
            publications
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error
        })
    }
}

export const createComment = async (req, res) => {
    try {
        const { name, comment } = req.body;

        const publication = await Publication.findById(req.params.id);
        if (!publication || !publication.status) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }

        publication.comments.unshift({
            name,
            comment
        })
        await publication.save();
        return res.status(201).json({
            success: true,
            message: "Comentario creado correctamente",
            publication
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el comentario",
            error
        })
    }
}

export const deletePublication = async (req, res) => {
    try {
        const deletePublication = await Publication.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
        if (!deletePublication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente",
            deletePublication
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error
        })
    }
}
