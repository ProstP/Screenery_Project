class Constucter_class {
    //Свойства
    Name: string;
    List_of_selected: List_of_selected_class;
    List_of_slides: List_of_slide_class;
    Workplace: Workplace_class;
    History_of_actions: History_of_actions_class;

    //Методы
    Preview() {
        return "Предпросмотр";
    };

    Cancel() { // Ctrl + Z
        this.History_of_actions.Cancel_action();
        return;
    };

    Undo() { // Ctrl + Y
        this.History_of_actions.Redo_action();
        return;
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
    //Свойства
    Selected_items: Slide_class|Element_class[];
    Type_of_items: string;

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
    //Свойства
    Slides: Slide_class[];
    
    //Методы
    Create_new_slide() {
        return "Создание нового слайда";
    };

    Select_slide_for_workplace(slide_id: number) {
        return "Выбран слайд " + slide_id;
    }
};

class Workplace_class {
    //Свойства
    Selected_slide: Slide_class;

    //Методы
    Create_new_element_on_slide(type: string) {
        this.Selected_slide.Create_new_element(type);
        return;
    };
};

class History_of_actions_class {
    //Свойства
    List_of_actions: Action[];
    List_of_canceled_actions: Action[];

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
    Copy_of_presentation: any;//Не придуман в каком формате
};

class Slide_class {
    //Свойства
    ID: number;
    List_of_elements: Element_class[];
    Backgrond: string;
    Preview: any;//Ещё не знаю

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
    Data: any[];//Определённый набор данных
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