import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
    const {senderId, recipientId} = req.query;

    try{
        const messages = await Message.find({
            $and: [
               {
                $or: [
                    {sender: senderId, recipients: recipientId},
                    {sender: recipientId, recipients: senderId}
                ]
               },
               {group: null}
            ]
        })

        res.status(200).json({success: true, data: messages})
    } catch (error) {
        console.error("Error is fetching chat messages", error.message);
        res.status(500).json({ success: false, message: "Server error"})
    }
}

export const createMessage = async (req, res) => {
    const Messages = req.body;
    
    if(!Messages.message){
        return res.status(400).json({ success: false, message:"Please provide a message"})
    }

    const newMessage = new Message(Messages)

    try{
        await newMessage.save();
        res.status(201).json({ success: true, data: newMessage})
    } catch (error) {
        console.error("error creating new message", error.message);
        res.status(500).json({ success: false, message: "server error  "})
    }
}