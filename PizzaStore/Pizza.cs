namespace PizzaStore.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Ingredients { get; set; }
    }
}
