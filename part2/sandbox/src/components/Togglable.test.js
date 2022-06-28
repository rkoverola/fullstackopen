import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='Show'>
        <div className='testDiv'>
          Togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.findAllByText('Togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)
    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})