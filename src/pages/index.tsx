import dynamoDb from '../../lib/dynamo-db'
import Card_1 from '../components/static_cards/Card_1'
import Card_2 from '../components/static_cards/Card_2'
import { CreditCard, Pix, Article, AttachMoney } from '../../node_modules/@mui/icons-material/index'
import { Box, Grid } from '../../node_modules/@mui/material/index'

export default function Home({ courses }) {

    interface status {
        id: number,
        name: string,
    }

    interface paymentMethod {
        id: number,
        name: string,
        subtotal: number,
        discount: number,
        total: number,
        status: status,
    }

    interface course {
        id: number,
        datetime: string,
        sku: string,
        name: string,
        payment_method: paymentMethod
    }

    const creditCardTotal = courses.reduce((total: number, i: course) => (i.payment_method.id == 2 ? total + i.payment_method.total : total), 0)
    const pixTotal = courses.reduce((total: number, i: course) => (i.payment_method.id == 4 ? total + i.payment_method.total : total), 0)
    const ticketTotal = courses.reduce((total: number, i: course) => (i.payment_method.id == 3 ? total + i.payment_method.total : total), 0)
    const total = creditCardTotal + pixTotal + ticketTotal

    const coursesList = [
        { sku: 'IMJKELW7CI', name: 'ANOTAÇÃO DE ENFERMAGEM' },
        { sku: 'BYSDRSWDHW', name: 'ASSISTÊNCIA DE ENFERMAGEM NA HEMOTERAPIA' },
        { sku: 'FGWO5QRARK', name: 'BIOSSEGURANÇA E ACIDENTES COM PÉRFURO' },
        { sku: 'PFVPP2NYRA', name: 'CALCULO DE MEDICAMENTOS' },
        { sku: 'CJ8FUIFYDC', name: 'EXCEL BASICO' },
        { sku: 'HOF4BQWFWI', name: 'GASOMETRIA: INTERPRETAÇÃO BÁSICA' },
        { sku: 'LHWI0GJUJ7', name: 'INSERÇÃO E MANUTENÇÃO DE CATÉTERES' },
        { sku: 'B15BBNIRK3', name: 'PROCESSOS DE ESTERILIZAÇÃO' },
        { sku: '2DWPKX0YT2', name: 'SEGURANÇA DO PACIENTE' },
        { sku: 'L96TLIZWRI', name: 'VENTILAÇÃO MECÂNICA BÁSICA' },
        { sku: 'CBAZ0XQADS', name: 'VIGILANCIA EM SAUDE' },
    ]

    let courseSalesStatisticsTableData = []

    coursesList.forEach(c => {
        const itensBySku = courses.filter(i => i.sku == c.sku)
        const data = createDataCourseSalesStatistics(c.sku, c.name, itensBySku.length, !itensBySku.length ? 0 : Math.round((100 * itensBySku.length) / courses.length))
        courseSalesStatisticsTableData.push(data)
    })

    function createDataCourseSalesStatistics(sku: string, name: string, total: number, percentage: number) {
        return { sku, name, total, percentage }
    }

    const courseSalesStatistics = {
        title: 'Estatística dos Cursos',
        subtitle: 'Total de Vendas',
        total: courses.length,
        table_data: courseSalesStatisticsTableData
    }

    return (
        <>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='flex-start'
                minHeight='100vh'
                padding={5}
            >
                <Grid
                    container
                    spacing={3}
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='baseline'
                >
                    <Grid item xs={3}>
                        <Card_1
                            icon={CreditCard}
                            iconcolor={'#ffffff'}
                            iconbgcolor={'#9155fd'}
                            title={'Cartão de Crédito'}
                            subheader={'R$ ' + creditCardTotal}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Card_1
                            icon={Pix}
                            iconcolor={'#ffffff'}
                            iconbgcolor={'#57ca01'}
                            title={'PIX'}
                            subheader={'R$ ' + pixTotal}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Card_1
                            icon={Article}
                            iconcolor={'#ffffff'}
                            iconbgcolor={'#f9b402'}
                            title={'Boleto'}
                            subheader={'R$ ' + ticketTotal}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Card_1
                            icon={AttachMoney}
                            iconcolor={'#ffffff'}
                            iconbgcolor={'#3eb2ff'}
                            title={'TOTAL'}
                            subheader={'R$ ' + total}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Card_2
                            title={courseSalesStatistics.title}
                            subheader={courseSalesStatistics.subtitle}
                            total={courseSalesStatistics.total}
                            data={courseSalesStatistics.table_data}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export const getStaticProps = async ({ params, previewData = {} }) => {

    const date = new Date().toLocaleDateString().split('/')

    const { Items } = await dynamoDb.scan({
        FilterExpression: '#month = :m AND #year = :y',
        ExpressionAttributeValues: {
            ':m': date[1],
            ':y': date[2],
        },
        ProjectionExpression: '#data',
        ExpressionAttributeNames: {
            "#month": "month",
            "#year": "year",
            "#data": "data",
        }
    })

    let courses = []

    Items.forEach((item: { data: any }) => {
        courses.push(createDataCourse(item.data))
    })

    function createDataCourse(data: any) {
        return {
            id: data.id,
            datetime: data.datetime,
            sku: data.items[0].item.item_identification_sku,
            name: data.items[0].item.item_identification_name,
            payment_method: createDataPaymentMethod(data),
        }
    }

    function createDataPaymentMethod(data: any) {
        return {
            id: data.payment_method.id,
            name: data.payment_method.name,
            subtotal: parseFloat(parseFloat(data.subtotal).toFixed(2)),
            discount: parseFloat(parseFloat(data.discount).toFixed(2)),
            total: parseFloat(parseFloat(data.total).toFixed(2)),
            status: {
                id: data.status_6_5.id,
                name: data.status_6_5.nome_5_4,
            }
        }
    }

    console.log('courses => ', courses)

    return {
        props: {
            courses,
        },
        revalidate: 60,
    }
}