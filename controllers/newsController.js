import News from "../models/newsModel.js"

const getNews = async (req,res) => {
    try {
        const news = await News.find({})
        res.json(news)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const createNews = async (req,res) => {

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin'){
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    try {
        // Create and save
        const news = News(req.body)
        await news.save()
        res.json(news)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const updateNews = async (req,res) => {

    const { id } = req.params

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin'){
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if news exist
    const news = await News.findById({ _id: id })

    if(!news) {
        const error = new Error('No existe esta noticia')
        return res.status(400).json({ message: error.message })
    }

    // Update news - save new parameter if exist
    news.title = req.body.title || news.title
    news.content = req.body.content || news.content

    try {
        // Save news
        await news.save()
        res.json(news)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const deleteNews = async (req,res) => {

    const { id } = req.params

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin'){
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if news exist
    const news = await News.findById({ _id: id })

    if(!news) {
        const error = new Error('No existe esta noticia')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Delete news
        await News.findByIdAndDelete({ _id: id })
        res.json({ message: 'Noticia eliminada exitosamente' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

export { getNews, createNews, updateNews, deleteNews }