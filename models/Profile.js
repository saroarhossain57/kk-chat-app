const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        address: {
            type: String
        },
        social_profiles: {
            facebook: {
                type: String
            },
            linkedin: {
                type: String
            },
            instagram: {
                type: String
            },
            github: {
                type: String
            }
        },
        education: [
            {
                institute: {
                    type: String,
                    required: true
                },
                degree: {
                    type: String,
                    required: true
                },
                subject: {
                    type: String,
                    required: true
                },
                passing_year: {
                    type: String,
                    required: true
                }
            }
        ],
        friends_list: [
            {
                profile: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'profile'
                },
                status: {
                    type: String,
                    enum: ['active', 'pending'],
                    default: 'pending'
                }
            }
        ],
        active_conversations: [
            {
                conversation: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'conversation'
                }
            }
        ],
        block_list: [
            {
                profile: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'profile'
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('profile', ProfileSchema);