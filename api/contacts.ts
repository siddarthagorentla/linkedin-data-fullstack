import dbConnect from '../lib/dbConnect';
import Contact from '../models/Contact';

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const contacts = await Contact.find({}).sort({ createdAt: -1 });
                res.status(200).json({ success: true, data: contacts });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const contact = await Contact.create(req.body);
                res.status(201).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
