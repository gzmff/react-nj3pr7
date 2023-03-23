import React, { Component, useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const data = [
  {
    laneId: '1632566094113939457',
    name: '简历筛选',
    statusList: [
      {
        id: '1638053044685934594',
        statusId: '1632566093732257794',
        name: '简历待筛选',
        type: 1,
        originalFlag: 0,
        flowStatusIdList: ['1632566093744840706', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093958750210',
            name: '通过',
            action: 'normal',
            icon: 'pass',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093958750211',
            name: '弃选',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [
          {
            stepId: '1632566093958750212',
            name: '推荐报告',
            action: 'report',
            icon: 'report',
            beforeConf: null,
            endFlag: false,
          },
        ],
      },
    ],
    containOriginalStatus: true,
    viewId: '1632566094076190721',
  },
  {
    laneId: '1633010274074144770',
    name: '面试',
    statusList: [
      {
        id: '1638053044690128898',
        statusId: '1632566093744840706',
        name: '面试待邀约',
        type: 1,
        originalFlag: 1,
        flowStatusIdList: ['1632566093753229313', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093958750213',
            name: '邀约',
            action: 'arrange',
            icon: 'invite',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093958750214',
            name: '弃选',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [],
      },
      {
        id: '1638053044694323201',
        statusId: '1632566093753229313',
        name: '等待面试',
        type: 1,
        originalFlag: 1,
        flowStatusIdList: ['1632566093765812226', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093962944514',
            name: '开始面试',
            action: 'normal',
            icon: 'interview',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093967138818',
            name: '弃选',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [
          {
            stepId: '1632566093962944515',
            name: '应聘登记',
            action: 'regform',
            icon: 'reg',
            beforeConf: null,
            endFlag: false,
          },
        ],
      },
      {
        id: '1638053044694323202',
        statusId: '1632566093765812226',
        name: '面试中',
        type: 2,
        originalFlag: 1,
        flowStatusIdList: ['1632566093774200833', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093967138819',
            name: '录用',
            action: 'normal',
            icon: 'pass',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093967138820',
            name: '淘汰',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [
          {
            stepId: '1632566093967138821',
            name: '面试评价',
            action: 'evaluate',
            icon: 'evaluate',
            beforeConf: null,
            endFlag: false,
          },
        ],
      },
      {
        id: '1638053044694323203',
        statusId: '1632566093774200833',
        name: '薪资待确认',
        type: 2,
        originalFlag: 1,
        flowStatusIdList: ['1632566093786783746', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093967138822',
            name: '确认薪资',
            action: 'salary',
            icon: 'salary',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093967138823',
            name: '弃选',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [],
      },
    ],
    containOriginalStatus: false,
    viewId: '1632566094076190721',
  },
  {
    laneId: '1638053043322785793',
    name: 'offer',
    statusList: [
      {
        id: '1638053044694323204',
        statusId: '1632566093786783746',
        name: 'offer准备',
        type: 2,
        originalFlag: 1,
        flowStatusIdList: ['1632566093799366657', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093967138824',
            name: '发送offer',
            action: 'offer',
            icon: 'offer',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093967138825',
            name: '弃选',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [],
      },
      {
        id: '1638053044698517506',
        statusId: '1632566093799366657',
        name: 'offer待确认',
        type: 2,
        originalFlag: 1,
        flowStatusIdList: ['1632566093811949569', '1632566093824532482'],
        main: [
          {
            stepId: '1632566093967138826',
            name: '接受',
            action: 'normal',
            icon: 'pass',
            beforeConf: null,
            endFlag: false,
          },
          {
            stepId: '1632566093971333121',
            name: '拒绝',
            action: 'normal',
            icon: 'abandon',
            beforeConf: null,
            endFlag: true,
          },
        ],
        minor: [],
      },
    ],
    containOriginalStatus: false,
    viewId: '1632566094076190721',
  },
  {
    laneId: '1638053043398283266',
    name: '结果',
    statusList: [
      {
        id: '1638053044698517507',
        statusId: '1632566093824532482',
        name: '弃选',
        type: 4,
        originalFlag: 1,
        flowStatusIdList: [],
        main: [],
        minor: [],
      },
      {
        id: '1638053044698517508',
        statusId: '1632566093811949569',
        name: '确认入职',
        type: 3,
        originalFlag: 1,
        flowStatusIdList: [],
        main: [],
        minor: [],
      },
    ],
    containOriginalStatus: false,
    viewId: '1632566094076190721',
  },
];

const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod'];

const cardColors = [
  'azure',
  'beige',
  'bisque',
  'blanchedalmond',
  'burlywood',
  'cornsilk',
  'gainsboro',
  'ghostwhite',
  'ivory',
  'khaki',
];
const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

const Card = () => {
  const [scene, setscene] = useState({
    children: data,
  });

  const getCardPayload = (columnId, index) => {
    return scene.children.filter((p) => p.laneId === columnId)[0].statusList[
      index
    ];
  };

  const onColumnDrop = (dropResult) => {
    const sceneT = Object.assign({}, scene);
    sceneT.children = applyDrag(sceneT.children, dropResult);
    setscene(sceneT);
  };

  const onCardDrop = (columnId, dropResult) => {
    console.log('onCardDrop');
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const sceneT = Object.assign({}, scene);
      const column = sceneT.children.filter((p) => p.laneId === columnId)[0];
      const columnIndex = sceneT.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.statusList = applyDrag(newColumn.statusList, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
      setscene(sceneT);
    }
  };
  return (
    <div className="board-setting">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview',
        }}
      >
        {scene.children.map((column) => {
          return (
            <Draggable key={column.laneId}>
              <div className="part">
                <div className="card-column-header">
                  <span className="column-drag-handle">&#x2630;</span>
                  {column.name}
                </div>
                <Container
                  orientation={'vertical'}
                  className="card-container"
                  groupName="col"
                  onDragStart={(e) => console.log('drag started', e)}
                  onDragEnd={(e) => console.log('drag end', e)}
                  onDrop={(e) => onCardDrop(column.laneId, e)}
                  getChildPayload={(index) =>
                    getCardPayload(column.laneId, index)
                  }
                  dragClass="card-ghost"
                  dropClass="card-ghost-drop"
                  onDragEnter={() => {
                    console.log('drag enter:', column.laneId);
                  }}
                  onDragLeave={() => {
                    console.log('drag leave:', column.laneId);
                  }}
                  onDropReady={(p) => console.log('Drop ready: ', p)}
                  dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview',
                  }}
                  dropPlaceholderAnimationDuration={200}
                >
                  {column.statusList.map((card) => {
                    return (
                      <Draggable key={card.id}>
                        <div
                          className="card"
                          // style={{ backgroundColor: pickColor() }}
                        >
                          <p>{card.name}</p>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
};

export default Card;
