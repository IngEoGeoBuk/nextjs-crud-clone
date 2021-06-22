import dbConnect from "../../../utils/dbConnect";
import Note from '../../../models/Note';

dbConnect();

export default async (req: any, res: any ) => {
    const { method } = req;

    switch(method) {
        // 전체 게시글 리스트 불러오기
        case 'GET':
            try {
                const notes = await Note.find({});
                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 게시글 생성
        case 'POST':
            try {
                const notes = await Note.create(req.body);
                res.status(201).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
            res.status(400).json({ success: false });
            break;
    }
}