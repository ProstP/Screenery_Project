class Constucter_class {
    //Это основной объект, он хранит в себе все данные и все методы, через него мы получим доступ ко всему

    //Свойства
    Name: string;
    List_of_selected: List_of_selected_class;       //Список выбранных элементов/слайдов
    List_of_slides: List_of_slide_class;            //Список слайдов
    Workplace: Workplace_class;                     //Рабочее простанство
    History_of_actions: History_of_actions_class;   //История действий

    //Методы, думаю рассказывать что они делают не вижу смысла, по их названиям должно быть понятно
    Preview() {
        return "Предпросмотр";
    };

    Create_new_presentation() {
        return "Создание новой презентации";
    };

    Save_in_format_json() {
        return "Сохранение презентации " + this.Name + " в формате json";
    }

    Load_presentation() {
        return "Загрузка презентации";
    }

    Export_in_pdf() {
        return "Сохранение презентации" + this.Name + "  в pdf формате";
    }
};

class List_of_selected_class {
    //Это список выбранных itemов, это могут быть как и слайды, так и элементы в слайде

    //Свойства
    Selected_items: Slide_class|Element_class[];    //Список этих itemов
    Type_of_items: string;                          //Здесь указан тип выделенных itemов или это слайд или это элементы

    //Методы
    Select_new_item(item: Slide_class|Element_class) {
        return "Выбран новый элемент";
    };

    Remove_from_list(item: Slide_class|Element_class) {
        return "Элемент удалён из списка";
    };

    Reset_selected() {
        return "Список выделенных удалён";
    }
};

class List_of_slide_class {
    //Список слайдов

    //Свойства
    Slides: Slide_class[]; //Просто список всех слайдов
    
    //Методы
    Create_new_slide() {
        return "Создание нового слайда";
    };

    Select_slide_for_workplace(slide_id: number) {
        return "Выбран слайд " + slide_id;
    }
};

class Workplace_class {
    //Рабочая область скажем так, поначалу я думал, что здесь будет и какие то методы, но вроде и объявлять ничего
    //Если что можем обойтись без отдельного класса, а поле Workplace в классе Construct будет просто указателем

    //Свойства
    Selected_slide: Slide_class; //Выбранный слайд будет передаваться сюда
};

class History_of_actions_class {
    //Свойства
    List_of_actions: Action[];          //Список всех предыдущих действий
    List_of_canceled_actions: Action[]; //Список действий которые мы отменили нажатием Ctrl + Z

    //Методы
    Cancel_action() { // Ctrl + Z
        return "Отменить действие";
    };
    Redo_action() { // Ctrl + Y
        return "Совершить отменённое действие";
    };
};

class Action {
    ID: number;
    Copy_of_presentation: any;  //Либо здесь будет лежать просто список слайдов, либо к нему добавится список выбранных элементов
};

class Slide_class {
    //Свойства
    ID: number;                         
    List_of_elements: Element_class[];  //Список элементов, которые находятся в слайде
    Backgrond: string;
    Preview: any;                       //Предпросмотр слайда, который будет отображаться в списке слайдов в панели выбора слайда

    //Методы
    Create_new_element(type: string){
        return "Создан новый объект типа " + type;
    };
};

class Element_class {
    ID: number;
    readonly Type: string;
    Position: Position_type;
    Scale: Scale_type; 
};

class Text_elt_class extends Element_class {
    Type: 'Text';
    Text: string;
    Font: Font_type;
};

class Image_elt_class extends Element_class {
    Type: "Image";
    Src: string;
}

class Graphic_elt_class extends Element_class {
    Type: "Graphic";
    Data: any[];    //Определённый набор данных
}

//Дальше идёт объявления типов
type Position_type = {
    X: number,
    Y: number,
}

type Scale_type = {
    Wigth: number;
    Height: number;
}

type Font_type = {
    Font_family: string,
    Font_style: string,
    Font_size: number,
    Color: string
}