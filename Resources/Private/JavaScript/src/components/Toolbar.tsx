import * as React from 'react';

import Headline from '@neos-project/react-ui-components/lib-esm/Headline';
import SelectBox from '@neos-project/react-ui-components/lib-esm/SelectBox';

import { Action, AppTheme, createUseAppStyles, useGraph, useIntl } from '../core';
import { chartType } from '../constants';
import { Breadcrumb } from './index';

const useStyles = createUseAppStyles((theme: AppTheme) => ({
    toolbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        '.neos &': {
            marginBottom: theme.spacing.half
        }
    },
    group: {
        flex: '0 1 auto',
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${theme.colors.contrastDark}`
    },
    headline: {
        '.neos &': {
            padding: `0 ${theme.spacing.half}`
        }
    }
}));

export default function Toolbar() {
    const classes = useStyles();
    const { translate } = useIntl();
    const { selectedLayout, dispatch } = useGraph();

    const selectableLayouts = [
        { label: 'Hierarchy', value: chartType.SUNBURST },
        { label: 'Dependencies', value: chartType.DEPENDENCIES }
    ];

    return (
        <div className={classes.toolbar}>
            <div className={classes.group}>
                <Breadcrumb />
            </div>

            <div className={classes.group}>
                <Headline type="h2" className={classes.headline}>
                    {translate('field.layout.label', 'Layout')}
                </Headline>
                <SelectBox
                    options={selectableLayouts}
                    onValueChange={layout => dispatch({ type: Action.SelectLayout, payload: layout })}
                    value={selectedLayout}
                />
            </div>
        </div>
    );
}
