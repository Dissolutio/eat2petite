import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '../../../routes'
import GalleryFullCard from './GalleryFullCard'
import GalleryList from './GalleryList'
import GalleryStats from './GalleryStats'

export default function GalleryRouter() {
    return (
        <Switch>
            <Route exact path={`${ROUTES.USER_HOME}`} component={GalleryList} />
            <Route exact path={`${ROUTES.USER_HOME}/stats`} component={GalleryStats} />
            <Route path={`${ROUTES.USER_HOME}/unit/id/:uid`} component={GalleryFullCard} />
        </Switch>
    )
}
