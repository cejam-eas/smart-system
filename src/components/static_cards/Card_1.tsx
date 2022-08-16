import { Card, CardHeader, Avatar, IconButton, Typography } from '../../../node_modules/@mui/material/index'
import { MoreVert } from '../../../node_modules/@mui/icons-material/index'

interface Card_1Props {
    icon: any
    iconcolor: string
    iconbgcolor: string
    title: string
    subheader: string
}

export default function Card_1(props: Card_1Props) {
    const Image = props.icon
    return (
        <>
            {/* <Card sx={{ maxWidth: 345 }}> */}
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label='recipe'
                            variant='rounded'
                            sx={
                                {
                                    width: 50,
                                    height: 50,
                                    bgcolor: props.iconbgcolor
                                }
                            }
                        >
                            <IconButton aria-label='settings'>
                                <Image sx={
                                    {
                                        fontSize: 35,
                                        color: props.iconcolor
                                    }
                                }
                                />
                            </IconButton>
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label='settings'>
                    //         <MoreVert />
                    //     </IconButton>
                    // }
                    title={props.title}
                    titleTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    subheader={props.subheader}
                    subheaderTypographyProps={{ variant: 'h5' }} //fontWeight:'bold'
                />
            </Card>
        </>
    )
}