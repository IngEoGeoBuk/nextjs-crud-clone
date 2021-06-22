import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

interface notesTypes {
    _id: string,
    title: string,
    description: string,
    __v? : number,
  }
  

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const data = await res.json();

    const paths = data.data.map((note: notesTypes) => {
      return {
        params: { id: note._id }
      }
    })
  
    return {
      paths,
      fallback: false
    }
}
  
export const getStaticProps = async (context : any) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3000/api/notes/' + id);
    const data = await res.json();
    const realdata = data.data

    return {
        props: { note: realdata }
    }
}

const Note = ({note} : any) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export default Note

