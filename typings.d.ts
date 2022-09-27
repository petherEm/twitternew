export interface Tweet extends TweetBody {
    profileImg: string | undefined
    username: ReactNode
    text: ReactNode
    image: JSX.Element
    _id: string,
    _createdAt: string,
    _udpatedAt: string,
    _rev: string,
    _type: 'tweet',
    blockTweet: boolean
}


export type TweetBody = {
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export type CommentBody = {
    comment: any
    tweetId: any
    text: string,
    username: string,
    profileImg: string,
    image?: string
}

export interface Comment extends CommentBody {
    profileImg: string | undefined
    username: ReactNode
    comment: ReactNode
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