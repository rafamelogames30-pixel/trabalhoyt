import React, { useEffect, useState, useCallback } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import { CommentGet } from '../../Models/Comment';
import Spinner from '../Spinner/Spinner';
import StockCommentList from '../StockCommentList/StockCommentList';

type Props = {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const [ comments, setComments ] = useState<CommentGet[] | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const baseTicker = stockSymbol.split('.')[0]; // ✅ adicionar isso

    const getComments = useCallback(() => {
        setLoading(true);
        commentGetAPI(baseTicker) // ✅ trocar stockSymbol por baseTicker
        .then((res) => {
            setLoading(false);
            setComments(res?.data!);
        })
    }, [baseTicker]);

    useEffect(() => {
        getComments();
    }, [getComments]);

    const handleComment = async (e: CommentFormInputs) => {
        try {
            const res = await commentPostAPI(e.title, e.content, baseTicker);
            if(res) {
                toast.success("Comment created successfully!");
                getComments();
            }
        } catch (e) {
            toast.warning("Server error occurred");
        }
    };

  return (
    <div className='flex flex-col'>
        {loading ? <Spinner /> : <StockCommentList comments={comments!} /> }
        <StockCommentForm symbol={baseTicker} handleComment={handleComment} />
    </div>
  )
};

export default StockComment