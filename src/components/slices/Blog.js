import React, {useEffect, useState} from 'react'
import RichText from "prismic-reactjs/src/Component";
import Button from "../Button";
import Modal from "../Modal";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => setIsShowing(!isShowing);

    return {isShowing, toggle};
};


const Blog = ({slice}) => {
    const [contentModal, setContentModal] = useState()
    const {isShowing, toggle} = useModal();
    useEffect(() => {
    }, [contentModal]);

    const modalNewContent = (content) => {
        setContentModal(content)
    }
    return (
        <section className="blog">
            <RichText render={slice.primary.blog_title.raw}/>
            {slice.items.map((ne, i) => {
                return (
                    <div
                        key={i}
                        className={'blog-container'}>
                        <div className={'blog-image'}>
                            <img width={200} src={ne.item_image.url} alt={i}/>
                        </div>
                        <div className={'blog-body'}>
                            <RichText render={ne.blog_item_title.raw}/>
                            <RichText render={ne.short_description.raw}/>
                            <div className={'blog-body__btn'} onClick={() => modalNewContent(ne)}>
                                <Button
                                    isShowing={isShowing}
                                    hide={toggle}/>
                            </div>
                            <Modal isShowing={isShowing} hide={toggle}>
                                {
                                    contentModal &&
                                    <div className={'blog-body-modal-body'} >
                                        <div className={'blog-body-modal-header'}>
                                            <RichText render={contentModal.blog_item_title.raw}/>
                                        </div>
                                        <RichText render={contentModal.content.raw}/>
                                    </div>
                                }
                            </Modal>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
export default Blog
