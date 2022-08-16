import { Card, CardHeader, CardContent, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '../../../node_modules/@mui/material/index'
import { MoreVert } from '../../../node_modules/@mui/icons-material/index'

interface tableData {
    sku: string
    name: string
    total: number
    percentage: number
}

interface Card_2Props {
    title: string
    subheader: string
    total: number
    data: [tableData]
}

export default function Card_2(props: any) {
    return (
        <>
            <Card>
                <CardHeader
                    // action={
                    //     <IconButton aria-label='settings'>
                    //         <MoreVert />
                    //     </IconButton>
                    // }
                    title={props.title}
                    titleTypographyProps={{ variant: 'body1' }}
                />
                <CardContent>
                    <Typography variant='h4'>
                        {props.total}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} color='text.secondary'>
                        {props.subheader}
                    </Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }} size={'small'} aria-label="custom pagination table">
                            <TableBody>
                                {props.data.map((row) => (
                                    <TableRow key={row.sku} sx={{
                                        "&:last-child th, &:last-child td": {
                                            borderBottom: 0,
                                        },
                                        "&:first-of-type th, &:first-of-type td": {
                                            paddingTop: 5,
                                        },
                                    }}>
                                        <TableCell sx={{ fontSize: 11 }} component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell style={{ width: 140 }} align="right">
                                            {row.total}
                                        </TableCell>
                                        <TableCell style={{ width: 100 }} align="right">
                                            {row.percentage}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    )
}