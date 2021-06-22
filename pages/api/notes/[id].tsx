import dbConnect from "../../../utils/dbConnect";
import Note from '../../../models/Note';

dbConnect();

export default async (req: any, res : any) => {
    const {
        query: { id },
        method
    } = req;

    switch(method) {
        // id 값 뽑아서 특정 게시글 세부내용 가져오기
        case 'GET':
            try {
                const note = await Note.findById(id);
                if(!note) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 게시글 수정
        case 'PUT' :
            try {
                const note = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if(!note) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 게시글 삭제
        case 'DELETE':
            try {
                const deletedNote = await Note.deleteOne({_id: id})
                if(!deletedNote) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}