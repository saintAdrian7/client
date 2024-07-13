import './MurphyAI.css'


const MurphyAI = () => {
    return(
        <div  className="chatbot-container">
             <iframe
            src="https://robertlearnsai-assistant-bot.hf.space"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="AI Chatbot"
        ></iframe>
        </div>
        
    
    )
}

export default MurphyAI