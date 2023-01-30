const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile'
        },
        Types: {
            type: String,
            enum: ['chat', 'room'],
            default: 'chat'
        },
        participents: [
            {
                profile: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'profile'
                }
            }
        ],
        messages: [
            {
                body: {
                    type: String,
                    required: true,
                },
                sender_profile: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'profile'
                },
                attachments: [
                    {
                        type: String
                    }
                ],
                created_time: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('conversation', ConversationSchema);