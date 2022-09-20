import { makeAutoObservable } from "mobx";

const AppStore = () => makeAutoObservable({
    searchQuery: '',
    scrollPositionY: 0,
    handleSearchQueryChange(value: string) {
        this.searchQuery = value
    },
    handleScrollPositionY(value: number) {
        this.scrollPositionY = value
    }
})

export default AppStore