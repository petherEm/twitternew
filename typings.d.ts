export interface Tweet extends TweetBody {
    _id: string,
    _createdAt: string,
    _udpatedAt: string,
    _rev: string,
    _type: 'tweet',
    blockTweet: boolean
}


export const TweetBody = {
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export const CommentBody = {
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export interface Comment extends CommentBody {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: 'comment',
    _updatedAt: string,
    tweet: {
        _ref: string,
        _type: 'reference'
    }
}