import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('OrderHistory e2e test', () => {

    let navBarPage: NavBarPage;
    let orderHistoryDialogPage: OrderHistoryDialogPage;
    let orderHistoryComponentsPage: OrderHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderHistories', () => {
        navBarPage.goToEntity('order-history');
        orderHistoryComponentsPage = new OrderHistoryComponentsPage();
        expect(orderHistoryComponentsPage.getTitle())
            .toMatch(/Order Histories/);

    });

    it('should load create OrderHistory dialog', () => {
        orderHistoryComponentsPage.clickOnCreateButton();
        orderHistoryDialogPage = new OrderHistoryDialogPage();
        expect(orderHistoryDialogPage.getModalTitle())
            .toMatch(/Create or edit a Order History/);
        orderHistoryDialogPage.close();
    });

    it('should create and save OrderHistories', () => {
        orderHistoryComponentsPage.clickOnCreateButton();
        orderHistoryDialogPage.setTicketUserIdInput('ticketUserId');
        expect(orderHistoryDialogPage.getTicketUserIdInput()).toMatch('ticketUserId');
        orderHistoryDialogPage.setTicketFlightIDInput('5');
        expect(orderHistoryDialogPage.getTicketFlightIDInput()).toMatch('5');
        orderHistoryDialogPage.setTicketPlaneTypeInput('5');
        expect(orderHistoryDialogPage.getTicketPlaneTypeInput()).toMatch('5');
        orderHistoryDialogPage.setTicketPriceInput('5');
        expect(orderHistoryDialogPage.getTicketPriceInput()).toMatch('5');
        orderHistoryDialogPage.setCreditCardIdInput('5');
        expect(orderHistoryDialogPage.getCreditCardIdInput()).toMatch('5');
        orderHistoryDialogPage.cardSelectLastOption();
        orderHistoryDialogPage.save();
        expect(orderHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OrderHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-order-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class OrderHistoryDialogPage {
    modalTitle = element(by.css('h4#myOrderHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    ticketUserIdInput = element(by.css('input#field_ticketUserId'));
    ticketFlightIDInput = element(by.css('input#field_ticketFlightID'));
    ticketPlaneTypeInput = element(by.css('input#field_ticketPlaneType'));
    ticketPriceInput = element(by.css('input#field_ticketPrice'));
    creditCardIdInput = element(by.css('input#field_creditCardId'));
    cardSelect = element(by.css('select#field_card'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTicketUserIdInput = function(ticketUserId) {
        this.ticketUserIdInput.sendKeys(ticketUserId);
    };

    getTicketUserIdInput = function() {
        return this.ticketUserIdInput.getAttribute('value');
    };

    setTicketFlightIDInput = function(ticketFlightID) {
        this.ticketFlightIDInput.sendKeys(ticketFlightID);
    };

    getTicketFlightIDInput = function() {
        return this.ticketFlightIDInput.getAttribute('value');
    };

    setTicketPlaneTypeInput = function(ticketPlaneType) {
        this.ticketPlaneTypeInput.sendKeys(ticketPlaneType);
    };

    getTicketPlaneTypeInput = function() {
        return this.ticketPlaneTypeInput.getAttribute('value');
    };

    setTicketPriceInput = function(ticketPrice) {
        this.ticketPriceInput.sendKeys(ticketPrice);
    };

    getTicketPriceInput = function() {
        return this.ticketPriceInput.getAttribute('value');
    };

    setCreditCardIdInput = function(creditCardId) {
        this.creditCardIdInput.sendKeys(creditCardId);
    };

    getCreditCardIdInput = function() {
        return this.creditCardIdInput.getAttribute('value');
    };

    cardSelectLastOption = function() {
        this.cardSelect.all(by.tagName('option')).last().click();
    };

    cardSelectOption = function(option) {
        this.cardSelect.sendKeys(option);
    };

    getCardSelect = function() {
        return this.cardSelect;
    };

    getCardSelectedOption = function() {
        return this.cardSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
