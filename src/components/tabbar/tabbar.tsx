import { Div, TabbarItem, Tabbar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon20VmojiOutline, Icon20CalendarOutline } from '@vkontakte/icons';
import { useState, useEffect } from 'react';

const Tabbarrr = () => {
    const [text, setText] = useState('one');
    const routeNavigator = useRouteNavigator();

    useEffect(() => {
        if (text === 'two') {
            setText('two')
            routeNavigator.replace('/calendar');
        }
    }, [text, routeNavigator]); // useEffect depends on text and routeNavigator

    return (
        <Div>
            <Tabbar style={{ padding: '10px 0' }}>
                <TabbarItem
                    selected={text === 'one'}
                    onClick={() => { routeNavigator.replace('/'); setText('one'); }}
                    text="Главная"
                >
                    <Icon20VmojiOutline />
                </TabbarItem>
                <TabbarItem
                    selected={text === 'two'}
                    onClick={() => setText('two')} //Only update state here
                    text="Календарь"
                >
                    <Icon20CalendarOutline />
                </TabbarItem>
            </Tabbar>
        </Div>
    );
};

export default Tabbarrr;