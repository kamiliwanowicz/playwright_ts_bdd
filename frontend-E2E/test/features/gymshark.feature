Feature: Gym Shark website tests

  @debug
  Scenario Outline: Add a random product from New Releases for <type>
    Given I go to "<type>" New Releases
    And I select a random item
    And I verify details on Product page
    And I select a random size
    When I add the item to the basket
    Then I verify item has been added successfully to Summary page
    And I expect the basket icon to display a correct number
    And I verify values on Checkout page

    Examples: 
      | type        |
      | Women       |
      | Men         |
      | Accessories |
