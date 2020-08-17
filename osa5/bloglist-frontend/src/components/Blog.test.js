import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Single Blog component test', () => {

    let component

    beforeEach(() => {

        const mockHandler = jest.fn()
        const user = {
            username: 'Pythonen',
            name: 'Aleksi'
        }

        const testBlog = {
            title: 'Testi blogi',
            author: 'Aleksi',
            url: 'www.example.com',
            likes: 12,
            user: [{ username: 'Pythonen', name: 'Aleksi' }]
        }

        component = render(
            <Blog
                blog={testBlog}
                onClick={mockHandler}
                user={user}
            />
        )
    })

    it('renders its title', () => {
        const div = component.container.querySelector('.titleAuthor')
        expect(div).toHaveTextContent('Testi blogi')
    })
    it('renders its author', () => {
        const div = component.container.querySelector('.titleAuthor')
        expect(div).toHaveTextContent('Aleksi')
    })

    test('When blogpost is clicked all info should be visible', () => {
        const titleAuthor = component.container.querySelector('.titleAuthor')
        const all = component.container.querySelector('.all')
        const showButton = screen.getByText('view')
        fireEvent.click(showButton)

        expect(titleAuthor).toHaveTextContent('Testi blogi')
        expect(titleAuthor).toHaveTextContent('Aleksi')

        expect(all).not.toHaveStyle('display: none')
    })
})