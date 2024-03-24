type UpdateModelProps = {
    name: string
    buttonMessage: string
}

export const UpdateModel: React.FC<UpdateModelProps> = ({
    name, 
    buttonMessage
}) => {
    // Add dialog showing and closing
    // https://blog.logrocket.com/creating-reusable-pop-up-modal-react/


    return (
        <>
            <button id={`open-modal-${name}`}>{buttonMessage}</button>
            <dialog id={`modal-${name}`} className="modal">
                <button 
                    id={`close-button-${name}`} 
                    className="modal-close-button"
                >
                    Close
                </button>
                <form>

                </form>
            </dialog>
        </>
    )
}