module.exports = {
    name: 'embed',
    description: 'Displays an embed',
    options: [
        {
            name: 'Name',
            description: 'Your name',
            required: true,
            type: 3, // string
        },
        {
            name: 'Age',
            description: 'Your age',
            required: false,
            type: 4, // integer
        },
    ],
}