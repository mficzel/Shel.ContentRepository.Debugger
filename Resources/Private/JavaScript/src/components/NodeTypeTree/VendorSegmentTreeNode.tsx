import * as React from 'react';
import { useState } from 'react';

import Tree from '@neos-project/react-ui-components/lib-esm/Tree';

import { dndTypes } from '../../constants';
import { NodeTypeTreeNode } from './index';
import { Action, useGraph } from '../../core';

interface VendorSegmentTreeNodeProps {
    isActive?: boolean;
    path: string;
    segment: string;
    subNodes?: object;
    level?: number;
    icon?: string;
}

export default function VendorSegmentTreeNode({
    path,
    segment,
    subNodes,
    level = 1,
    icon = 'folder'
}: VendorSegmentTreeNodeProps) {
    const [collapsed, setCollapsed] = useState(true);
    const { dispatch } = useGraph();

    const hasChildren = subNodes && Object.keys(subNodes).length > 0;

    return (
        <Tree.Node>
            <Tree.Node.Header
                isActive={false}
                isCollapsed={collapsed}
                isFocused={false}
                isLoading={false}
                hasError={false}
                label={segment}
                title={segment}
                icon={icon}
                nodeDndType={dndTypes.NODE_TYPE}
                level={level}
                onToggle={() => setCollapsed(!collapsed)}
                onClick={() => dispatch({ type: Action.SelectPath, payload: path })}
                hasChildren={hasChildren}
            />
            {!collapsed &&
                hasChildren &&
                Object.keys(subNodes).map((segment, index) =>
                    subNodes[segment].name ? (
                        <NodeTypeTreeNode key={index} level={level + 1} nodeType={subNodes[segment]} />
                    ) : (
                        <VendorSegmentTreeNode
                            key={index}
                            level={level + 1}
                            path={path + '.' + segment}
                            segment={segment}
                            subNodes={subNodes[segment]}
                        />
                    )
                )}
        </Tree.Node>
    );
}
