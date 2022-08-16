import dynamoDb from '../../../lib/dynamo-db'

export default async function handler(req, res) {
    if (req.query.method === 'get') {
        const { Item } = await dynamoDb.get({
            Key: {
                id: req.query.id
            }
        })

        res.status(200).json(Item)
    }

    if (req.query.method === 'scan') {

        const { Items } = await dynamoDb.scan({
            FilterExpression: '#month = :m AND #year = :y',
            ExpressionAttributeValues: {
                ':m': req.query.month,
                ':y': req.query.year,
            },
            ProjectionExpression: '#data',
            ExpressionAttributeNames: {
                "#month": "month",
                "#year": "year",
                "#data": "data",
            }
        })

        res.status(200).json({ data: Items })
    }
}