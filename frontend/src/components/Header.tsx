import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink'

const Header = () => {

  return (
    <AppBar sx={{ bgcolor:"transparent", position:"static", boxShadow:"none", pt: 2 }}>
      <Toolbar sx={{ display:"flex", width: "min(1180px, calc(100% - 40px))", mx: "auto", px: "0 !important" }}>
<Logo />
<div style={{marginLeft:"auto", display: "flex", alignItems: "center", gap: "8px"}} >
<NavigationLink bg='#5ee8d0' to='/chat' text='Open the AI' textColor='#071522' />
</div>
        </Toolbar>
    </AppBar>
  )
}

export default Header