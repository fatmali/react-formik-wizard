import React from 'react'

const SectionNav = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <div>
      <a
        role='button'
        className={menuOpen ? 'navbar-burger is-active' : 'navbar-burger'}
        data-target='navMenu'
        aria-label='menu'
        aria-expanded='false'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </a>
      <div
        className={menuOpen ? 'navbar-menu is-active' : 'navbar-menu'}
        id='navMenu'
      >
        <aside className='menu'>
          <p className='menu-label'>General</p>
          <ul className='menu-list'>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Customers</a>
            </li>
          </ul>
          <p className='menu-label'>Administration</p>
          <ul className='menu-list'>
            <li>
              <a>Team Settings</a>
            </li>

            <li>
              <a>Invitations</a>
            </li>
          </ul>
          <p className='menu-label'>Transactions</p>
          <ul className='menu-list'>
            <li>
              <a>Payments</a>
            </li>
            <li>
              <a>Transfers</a>
            </li>
            <li>
              <a>Balance</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default SectionNav
