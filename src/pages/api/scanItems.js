import dynamoDb from '../../../lib/dynamo-db'

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const { Items } = await dynamoDb.scan({
            FilterExpression: '#month = :m AND #year = :y',
            ExpressionAttributeValues: {
                ':m': req.query.month,
                ':y': req.query.year,
            },
            ProjectionExpression: 'data',
            ExpressionAttributeNames: {
                "#month": "month",
                "#year": "year",
            }
        })

        res.status(200).json({ data: Items })
    }
}